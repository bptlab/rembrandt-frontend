<template>
  <div
    ref="draggable"
    :class="`draggable transformer ${inputClasses} ${outputClasses}`"
    :style="{transform: translate}"
  >
    <div v-if="!isBeeingDragged" class="input-connector-wrapper">
      <div
        v-for="inputConnector in inputConnectors"
        :key="inputConnector.resourceType.name"
        ref="inputDropzones"
        class="connector input-connector"
        :class="{disabled: inputConnector.disabled}"
        :accepts="inputConnector.resourceType.id"
      >{{ inputConnector.resourceType.name }}</div>
    </div>

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
      >{{ outputConnector.resourceType.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Draggable from '@/components/Draggable.vue';
import { Transformer, TransformerIngredient, IngredientType } from '@/apis/rembrandt/rembrandt';

@Component
export default class TransformerDraggable extends Draggable implements TransformerIngredient {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop({ type: Object })
  public ingredientObject!: Transformer;

  public ingredientType = IngredientType.TRANSFORM;

  public get inputClasses(): string {
    if (!this.ingredientObject.resourceType.id) { return ''; }
    return `input-${this.ingredientObject.resourceType.id}`;
  }

  public get outputClasses(): string {
    if (!this.ingredientObject.resourceType.id) { return ''; }
    return `output-${this.ingredientObject.resourceType.id}`;
  }

  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public mounted() {
    this.inputConnectors.push({
      resourceType: this.ingredientObject.resourceType,
      disabled: false,
    });
    this.outputConnector = {
      resourceType: this.ingredientObject.resourceType,
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

div.draggable.transformer {
  .element {
    background-color: grey;
    border-radius: 0;

    shape-outside: polygon(
      calc(100% - @spacing * 2) 0%,
      100% 50%,
      calc(100% - @spacing * 2) 100%,
      0% 100%,
      calc(0% + @spacing * 2) 50%,
      0% 0%
    );
    shape-margin: 20px;
    clip-path: polygon(
      calc(100% - @spacing * 2) 0%,
      100% 50%,
      calc(100% - @spacing * 2) 100%,
      0% 100%,
      calc(0% + @spacing * 2) 50%,
      0% 0%
    );
  }
}
</style>
