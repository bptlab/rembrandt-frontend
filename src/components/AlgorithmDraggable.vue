<template>
  <div
    ref="draggable"
    :class="`draggable algorithm ${inputClasses} ${outputClasses}`"
    :style="{transform: translate}"
  >
    <div class="input-connector-wrapper">
      <div
        v-if="!isBeeingDragged"
        v-for="inputConnector in inputConnectors"
        :key="inputConnector.resourceType.name"
        ref="inputDropzones"
        class="connector input-connector"
        :class="{disabled: inputConnector.disabled}"
        :accepts="inputConnector.resourceType.id"
      >
        <span>{{ inputConnector.resourceType.name }}</span>
      </div>
    </div>

    <div :class="{element: true, dragging: isBeeingDragged}">
      <span>{{ingredientObject.name}}</span>
    </div>

    <div class="output-connector-wrapper">
      <div
        v-if="!isBeeingDragged"
        ref="outputDropzone"
        class="connector"
        :class="{disabled: outputConnector.disabled}"
        :accepts="outputConnector.resourceType.id"
      >
        <span>{{ outputConnector.resourceType.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator';
import Draggable from '@/components/Draggable.vue';
import { OptimizationAlgorithm, AlgorithmIngredient, IngredientType } from '@/apis/rembrandt/rembrandt';

@Component
export default class AlgorithmDraggable extends Draggable implements AlgorithmIngredient {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop({ type: Object })
  public ingredientObject!: OptimizationAlgorithm;

  public ingredientType = IngredientType.ALGORITHM;

  public get inputClasses(): string {
    if (this.ingredientObject.inputs.length <= 0) { return ''; }
    return this.ingredientObject.inputs.map((input) => `input-${input.id}`).join(' ');
  }

  public get outputClasses(): string {
    if (!this.ingredientObject.outputs.id) { return ''; }
    return `output-${this.ingredientObject.outputs.id}`;
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public mounted() {
    this.inputConnectors = this.ingredientObject.inputs.map((input) => {
      return {
        resourceType: input,
        disabled: false,
      };
    });
    this.outputConnector = {
      resourceType: this.ingredientObject.outputs,
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

div.draggable.algorithm {
  .element {
    background-color: red;
    border-radius: 0;
  }

  .element.dragging {
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

  .input-connector-wrapper {
    top: -50%;
  }

  .input-connector-wrapper,
  .output-connector-wrapper {
    .connector {
      &.disabled {
        display: block;
        & > * {
          display: none;
        }
        &:after {
          background-color: red;
        }
      }
    }
  }
}
</style>
