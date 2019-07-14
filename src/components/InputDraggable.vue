<template>
  <div ref="draggable" :class="`draggable input ${outputClasses}`" :style="{transform: translate}">
    <div class="element">
      <span>{{ingredientObject.name}}</span>
    </div>
    <div class="output-connector-wrapper">
      <div
        v-if="!isBeeingDragged"
        ref="outputDropzone"
        class="connector"
        :class="{disabled: outputConnector.disabled}"
        :accepts="outputConnector.resourceType.id"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Draggable from '@/components/Draggable.vue';
import { ResourceType, InputIngredient, IngredientType } from '@/apis/rembrandt/rembrandt';

@Component
export default class InputDraggable extends Draggable implements InputIngredient {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop({ type: Object })
  public ingredientObject!: ResourceType;

  public ingredientType = IngredientType.INPUT;

  public get outputClasses(): string {
    if (!this.ingredientObject.id) { return ''; }
    return `output-${this.ingredientObject.id}`;
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public mounted() {
    this.outputConnector = {
      resourceType: this.ingredientObject,
      disabled: false,
    };
  }
  // endregion

  // region private methods
  // endregion
}
</script>


<style lang="less">
@import "../colors.less";

div.draggable.input {
  .element {
    background-color: green;

    shape-outside: polygon(
      calc(100% - @spacing * 2) 0%,
      100% 50%,
      calc(100% - @spacing * 2) 100%,
      0% 100%,
      0% 0%
    );
    shape-margin: 20px;
    clip-path: polygon(
      calc(100% - @spacing * 2) 0%,
      100% 50%,
      calc(100% - @spacing * 2) 100%,
      0% 100%,
      0% 0%
    );
  }
}
</style>
