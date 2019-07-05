<template>
  <div ref="draggable" :class="`draggable output ${inputClasses}`" :style="{transform: translate}">
    <div
      ref="inputDropzone"
      :class="{inputConnector: !isBeeingDragged}"
      :accepts="ingredientObject.id || 'nothing'"
    />
    <div class="element">
      <span>Output Draggable: {{ingredientObject.name}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Draggable, { DropzoneEvent } from '@/components/Draggable.vue';
import { OutputIngredient } from '@/plugins/RecipeModeler';
import { ResourceType } from '@/apis/rembrandt/rembrandt';
import interact from 'interactjs';

@Component
export default class OutputDraggable extends Draggable implements OutputIngredient {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public input?: Draggable;

  @Prop({ type: Object })
  public ingredientObject!: ResourceType;

  public get inputClasses(): string {
    return this.ingredientObject.id ? `input-${this.ingredientObject.id}` : 'no-input';
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

  public dropped(event: DropzoneEvent): void {
    if (event.detail.dropzone === this.$refs.inputDropzone) { return; }
    this.addInput(event.detail.dropzoneComponent);
    event.detail.dropzoneComponent.addOutput(this);
    this.adjustPositionToDropzone(event.detail.draggable, event.detail.dropzone);
  }
  // endregion

  // region private methods
  private updateDropzones() {
    const accepts = `.output-${(this.$refs.inputDropzone as HTMLElement).getAttribute('accepts')}`;
    this.enableDropzone(this.$refs.inputDropzone as HTMLDivElement, accepts);
  }
  // endregion
}
</script>


<style lang="less">
@import "../colors.less";

div.draggable.output {
  .element {
    background-color: blueviolet;
  }
}
</style>
