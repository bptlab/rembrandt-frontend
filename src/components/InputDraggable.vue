<template>
  <div ref="draggable" class="draggable" :style="{transform: translate}">
    <div class="element">
      <span>Input Draggable: {{ingredientObject.name}}</span>
    </div>
    <div ref="outputDropzone" :class="{outputConnector: !isBeeingDragged}" />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Draggable, { DropzoneEvent } from '@/components/Draggable.vue';
import { InputIngredient } from '@/plugins/RecipeModeler';
import { ResourceType } from '@/apis/rembrandt/rembrandt';
import interact from 'interactjs';

@Component
export default class InputDraggable extends Draggable implements InputIngredient {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop()
  public output?: Draggable;

  @Prop({ type: Object })
  public ingredientObject!: ResourceType;
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public mounted() {
    this.enableDropzone(this.$refs.outputDropzone as HTMLDivElement);
  }

  public dropped(event: DropzoneEvent): void {
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
</style>
