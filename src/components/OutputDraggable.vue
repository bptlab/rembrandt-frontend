<template>
  <div ref="draggable" class="draggable output" :style="{transform: translate}">
    <div ref="inputDropzone" :class="{inputConnector: !isBeeingDragged}" />
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
  @Prop()
  public input?: Draggable;

  @Prop({ type: Object })
  public ingredientObject!: ResourceType;
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public mounted() {
    this.enableDropzone(this.$refs.inputDropzone as HTMLDivElement, '.transformer, .algorithm, .input');
  }

  public dropped(event: DropzoneEvent): void {
    if (event.detail.dropzone === this.$refs.inputDropzone) { return; }
    this.adjustPositionToDropzone(event.detail.draggable, event.detail.dropzone);
  }
  // endregion

  // region private methods
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
