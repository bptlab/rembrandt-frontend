<template>
  <div
    ref="draggable"
    :class="`draggable transformer ${inputClasses} ${outputClasses}`"
    :style="{transform: translate}"
  >
    <div ref="inputDropzone" :class="{inputConnector: !isBeeingDragged}" />
    <div class="element">
      <span>Transformer Draggable: {{ingredientObject.name}}</span>
    </div>
    <div ref="outputDropzone" :class="{outputConnector: !isBeeingDragged}" />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Draggable, { DropzoneEvent } from '@/components/Draggable.vue';
import { TransformerIngredient } from '@/plugins/RecipeModeler';
import { Transformer } from '@/apis/rembrandt/rembrandt';
import interact from 'interactjs';

@Component
export default class TransformerDraggable extends Draggable implements TransformerIngredient {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop({ type: Object })
  public ingredientObject!: Transformer;

  public input?: Draggable;
  public output?: Draggable;

  public get inputClasses(): string {
    return this.ingredientObject.resourceType.id ? `input-${this.ingredientObject.resourceType.id}` : 'no-input';
  }

  public get outputClasses(): string {
    return this.ingredientObject.resourceType.id ? `output-${this.ingredientObject.resourceType.id}` : 'no-output';
  }

  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public mounted() {
    const inputAccepts = `.output-${(this.$refs.inputDropzone as HTMLElement).getAttribute('accepts')}`;
    this.enableDropzone(this.$refs.inputDropzone as HTMLDivElement, inputAccepts);
    const outputAccepts = `.input-${(this.$refs.outputDropzone as HTMLElement).getAttribute('accepts')}`;
    this.enableDropzone(this.$refs.outputDropzone as HTMLDivElement, outputAccepts);
  }

  public dropped(event: DropzoneEvent): void {
    if (event.detail.dropzone === this.$refs.inputDropzone) { return; }
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
  // endregion

  // region private methods
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
