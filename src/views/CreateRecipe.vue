<template>
  <main class="create-recipe">
    <div class="ingredients">
      <div class="add-inputs">
        <h2>Inputs</h2>
        <button
          v-for="resourceType in resourceTypes"
          :key="resourceType.id"
          @click="addInputIngredient(resourceType)"
        >{{ resourceType.name }}</button>
      </div>
      <div class="add-outputs">
        <h2>Outputs</h2>
        <button
          v-for="resourceType in resourceTypes"
          :key="resourceType.id"
          @click="addOutputIngredient(resourceType)"
        >{{ resourceType.name }}</button>
      </div>
      <div class="add-transformers">
        <h2>Transformers</h2>
        <button
          v-for="transformer in transformers"
          :key="transformer.id"
          @click="addTransformerIngredient(transformer)"
        >{{ transformer.name }}</button>
      </div>
      <div class="add-algorithms">
        <h2>Algorithms</h2>
        <button
          v-for="algorithm in algorithms"
          :key="algorithm.id"
          @click="addAlgorithmIngredient(algorithm)"
        >{{ algorithm.name }}</button>
      </div>
    </div>

    <div class="playground">
      <InputDraggable
        v-for="ingredient in inputIngredients"
        :key="ingredient.ingredientObject.id"
        :ingredientObject="ingredient.ingredientObject"
      />
      <OutputDraggable
        v-for="ingredient in outputIngredients"
        :key="ingredient.ingredientObject.id"
        :ingredientObject="ingredient.ingredientObject"
      />
      <TransformerDraggable
        v-for="ingredient in transformerIngredients"
        :key="ingredient.ingredientObject.id"
        :ingredientObject="ingredient.ingredientObject"
      />
      <AlgorithmDraggable
        v-for="ingredient in algorithmIngredients"
        :key="ingredient.ingredientObject.id"
        :ingredientObject="ingredient.ingredientObject"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Draggable from '@/components/Draggable.vue';
import InputDraggable from '@/components/InputDraggable.vue';
import OutputDraggable from '@/components/OutputDraggable.vue';
import TransformerDraggable from '@/components/TransformerDraggable.vue';
import AlgorithmDraggable from '@/components/AlgorithmDraggable.vue';
import { InputIngredient, OutputIngredient, TransformerIngredient, AlgorithmIngredient } from '@/plugins/RecipeModeler';
import {
  ResourceTypeNullObject,
  ResourceTypes,
  createTransformerNullObject,
  Transformers,
  Transformer,
  createOptimizationAlgorithmNullObject,
  OptimizationAlgorithms,
  ResourceType,
  OptimizationAlgorithm,
} from '@/apis/rembrandt/rembrandt';
import interact from 'interactjs';

@Component({
  components: {
    Draggable,
    InputDraggable,
    OutputDraggable,
    TransformerDraggable,
    AlgorithmDraggable,
  },
})
export default class CreateRecipe extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  // endregion

  // region private members
  private inputIngredients: InputIngredient[] = [];
  private outputIngredients: OutputIngredient[] = [];
  private transformerIngredients: TransformerIngredient[] = [];
  private algorithmIngredients: AlgorithmIngredient[] = [];

  private resourceTypes: ResourceType[] = [];
  private transformers: Transformer[] = [];
  private algorithms: OptimizationAlgorithm[] = [];
  // endregion

  // region constructor
  // endregion

  // region public methods
  public async mounted() {
    this.resourceTypes = await ResourceTypes.get();
    this.transformers = await Transformers.get();
    this.algorithms = await OptimizationAlgorithms.get();
  }
  // endregion

  // region private methods
  private addInputIngredient(resourceType: ResourceType) {
    this.inputIngredients.push({
      inputs: [],
      ingredientObject: resourceType,
      position: {
        x: 0,
        y: 0,
      },
    });
  }

  private addOutputIngredient(resourceType: ResourceType) {
    this.outputIngredients.push({
      inputs: [],
      ingredientObject: resourceType,
      position: {
        x: 0,
        y: 0,
      },
    });
  }

  private addTransformerIngredient(transformer: Transformer) {
    this.transformerIngredients.push({
      inputs: [],
      ingredientObject: transformer,
      position: {
        x: 0,
        y: 0,
      },
    });
  }

  private addAlgorithmIngredient(algorithm: OptimizationAlgorithm) {
    this.algorithmIngredients.push({
      inputs: [],
      ingredientObject: algorithm,
      position: {
        x: 0,
        y: 0,
      },
    });
  }
  // endregion
}
</script>

<style lang="less">
@import "../colors.less";

main.create-recipe {
  max-width: unset;
  display: flex;

  .ingredients,
  .ingredients > * {
    display: flex;
    flex-direction: column;
  }

  .ingredients {
    margin: @spacing;
    min-width: 200px;

    & > * {
      padding: @spacing 0;
    }

    & > *:first-child {
      padding: 0;
    }
  }

  .playground {
    flex: 1 0;
    margin: @spacing 0;
  }
}
</style>

