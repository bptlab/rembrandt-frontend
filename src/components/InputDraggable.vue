<template>
  <div ref="draggable" :class="`draggable input ${outputClasses}`" :style="{transform: translate}">
    <div class="element">
      <span>Input Draggable: {{ingredientObject.name}}</span>
    </div>
    <div
      ref="outputDropzone"
      :class="{outputConnector: !isBeeingDragged}"
      :accepts="ingredientObject.id || 'nothing'"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Draggable, { DropzoneEvent } from '@/components/Draggable.vue';
import { InputIngredient } from '@/plugins/RecipeModeler';
import { ResourceType } from '@/apis/rembrandt/rembrandt';

@Component
export default class InputDraggable extends Draggable implements InputIngredient {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop({ type: Object })
  public ingredientObject!: ResourceType;

  public get outputClasses(): string {
    return this.ingredientObject.id ? `output-${this.ingredientObject.id}` : 'no-output';
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
  // endregion

  // region private methods
  public dropped(event: DropzoneEvent): void {
    if (event.detail.dropzone === this.$refs.outputDropzone) { return; }
    this.addOutput(event.detail.dropzoneComponent);
    event.detail.dropzoneComponent.addInput(this);
    this.adjustPositionToDropzone(event.detail.draggable, event.detail.dropzone);
  }

  private updateDropzones() {
    const accepts = `.input-${(this.$refs.outputDropzone as HTMLElement).getAttribute('accepts')}`;
    this.enableDropzone(this.$refs.outputDropzone as HTMLDivElement, accepts);
  }
  // endregion
}
</script>


<style lang="less">
@import "../colors.less";

div.draggable.input {
  .element {
    background-color: green;
  }
}
</style>
