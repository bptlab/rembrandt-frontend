<template>
  <div
    ref="draggable"
    :class="`draggable algorithm ${inputClasses} ${outputClasses}`"
    :style="{transform: translate}"
  >
    <div
      v-if="!isBeeingDragged"
      v-for="input in ingredientObject.inputs"
      :key="input.name"
      ref="inputDropzones"
      class="inputConnector"
      :accepts="input.id || 'nothing'"
    >{{ input.name }}</div>
    <div class="element">
      <span>Algorithm Draggable: {{ingredientObject.name}}</span>
    </div>
    <div
      ref="outputDropzone"
      :class="{outputConnector: !isBeeingDragged}"
      :accepts="ingredientObject.outputs.id || 'nothing'"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import Draggable, { DropzoneEvent } from '@/components/Draggable.vue';
import { AlgorithmIngredient } from '@/plugins/RecipeModeler';
import { OptimizationAlgorithm } from '@/apis/rembrandt/rembrandt';
import interact from 'interactjs';

@Component
export default class AlgorithmDraggable extends Draggable implements AlgorithmIngredient {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop({ type: Object })
  public ingredientObject!: OptimizationAlgorithm;

  public input?: Draggable[];

  public get inputClasses(): string {
    if (this.ingredientObject.inputs.length <= 0) { return 'no-input'; }
    return this.ingredientObject.inputs.map((input) => `input-${input.id}`).join(' ');
  }

  public get outputClasses(): string {
    return `output-${this.ingredientObject.outputs.id || 'no-output'}`;
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public mounted() {
    this.updateDropzones();
  }

  public updated() {
    this.updateDropzones();
  }

  public addInput(ingredient: Draggable) {
    if (!this.input) {
      this.input = [];
    }
    this.input.push(ingredient);
  }

  public addOutput(ingredient: Draggable) {
    this.output = ingredient;
  }
  // endregion

  // region private methods
  public dropped(event: DropzoneEvent): void {
    for (const inputDropzone of this.$refs.inputDropzones as HTMLDivElement[]) {
      if (event.detail.dropzone === inputDropzone) { return; }
    }
    if (event.detail.dropzone === this.$refs.outputDropzone) { return; }

    if (event.detail.dropzone.classList.contains('inputConnector')) {
      this.addOutput(event.detail.dropzoneComponent);
      event.detail.dropzoneComponent.addInput(this);
    } else {
      this.addInput(event.detail.dropzoneComponent);
      event.detail.dropzoneComponent.addOutput(this);
    }

    this.adjustPositionToDropzone(event.detail.draggable, event.detail.dropzone);
  }

  private updateDropzones() {
    const outputAccepts = `.input-${(this.$refs.outputDropzone as HTMLElement).getAttribute('accepts')}`;
    this.enableDropzone(this.$refs.outputDropzone as HTMLDivElement, outputAccepts);

    if (!this.$refs.inputDropzones) { return };
    for (const inputDropzone of this.$refs.inputDropzones as HTMLDivElement[]) {
      const inputAccepts = `.output-${inputDropzone.getAttribute('accepts')}`;
      this.enableDropzone(inputDropzone, inputAccepts);
    }
  }
  // endregion
}
</script>


<style lang="less">
@import "../colors.less";

div.draggable.algorithm {
  .element {
    background-color: red;
  }

  .inputConnector:first-child {
    top: -104px;
    height: 100px;
    width: 200px;
    border: dashed 4px yellow;
    touch-action: none;
    pointer-events: none;
  }
}
</style>
