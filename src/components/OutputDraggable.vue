<template>
  <div ref="draggable" :class="`draggable output ${inputClasses}`" :style="{transform: translate}">
    <div class="input-connector-wrapper">
      <div
        v-if="!isBeeingDragged"
        v-for="inputConnector in inputConnectors"
        :key="inputConnector.resourceType.id"
        ref="inputDropzones"
        class="connector input-connector"
        :class="{disabled: inputConnector.disabled}"
        :accepts="inputConnector.resourceType.id"
      />
    </div>

    <div class="element">
      <span>{{ingredientObject.name}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import Draggable, { Connector } from '@/components/Draggable.vue';
import { ResourceType, ResourceTypeNullObject, OutputIngredient } from '@/apis/rembrandt/rembrandt';

@Component
export default class OutputDraggable extends Draggable implements OutputIngredient {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop({ type: Object })
  public ingredientObject!: ResourceType;

  public get inputClasses(): string {
    if (!this.ingredientObject.id) { return ''; }
    return `input-${this.ingredientObject.id}`;
  }

  public inputConnectors: Connector[] = [];
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public mounted() {
    this.inputConnectors.push({
      resourceType: this.ingredientObject,
      disabled: false,
    });
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
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    shape-outside: polygon(
      100% 0%,
      100% 100%,
      0% 100%,
      calc(0% + @spacing * 2) 50%,
      0% 0%
    );
    shape-margin: 20px;
    clip-path: polygon(
      100% 0%,
      100% 100%,
      0% 100%,
      calc(0% + @spacing * 2) 50%,
      0% 0%
    );
  }
}
</style>
