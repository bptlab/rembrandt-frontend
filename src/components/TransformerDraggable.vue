<template>
  <div ref="draggable" class="draggable transformer" :style="{transform: translate}">
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
  @Prop()
  public input?: Draggable;

  @Prop()
  public output?: Draggable;

  @Prop({ type: Object })
  public ingredientObject!: Transformer;
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public mounted() {
    this.enableDropzone(this.$refs.inputDropzone as HTMLDivElement, '.input, .algorithm');
    this.enableDropzone(this.$refs.outputDropzone as HTMLDivElement, '.algorithm, .output');
  }

  public dropped(event: DropzoneEvent): void {
    if (event.detail.dropzone === this.$refs.inputDropzone) { return; }
    if (event.detail.dropzone === this.$refs.outputDropzone) { return; }
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
