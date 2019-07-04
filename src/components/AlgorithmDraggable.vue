<template>
  <div ref="draggable" class="draggable algorithm" :style="{transform: translate}">
    <div
      v-for="input in ingredientObject.inputs"
      :key="input.name"
      ref="inputDropzones"
      :class="{inputConnector: !isBeeingDragged}"
    >{{ input.name }}</div>
    <div class="element">
      <span>Algorithm Draggable: {{ingredientObject.name}}</span>
    </div>
    <div ref="outputDropzone" :class="{outputConnector: !isBeeingDragged}" />
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
  @Prop()
  public input?: Draggable[];

  @Prop()
  public output?: Draggable;

  @Prop({ type: Object })
  public ingredientObject!: OptimizationAlgorithm;
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

  protected dropped(event: DropzoneEvent): void {
    for (const inputDropzone of this.$refs.inputDropzones as HTMLDivElement[]) {
      if (event.detail.dropzone === inputDropzone) { return; }
    }
    if (event.detail.dropzone === this.$refs.outputDropzone) { return; }
    this.adjustPositionToDropzone(event.detail.draggable, event.detail.dropzone);
  }
  // endregion

  // region private methods
  private updateDropzones() {
    this.enableDropzone(this.$refs.outputDropzone as HTMLDivElement, '.transformer, .output');

    if (!this.$refs.inputDropzones) { return };
    for (const inputDropzone of this.$refs.inputDropzones as HTMLDivElement[]) {
      this.enableDropzone(inputDropzone, '.input, .transformer');
    }
  }
  // endregion
}
</script>


<style lang="less">
@import "../colors.less";

div.draggable.transformer {
  .element {
    background-color: grey;
  }
}
</style>
