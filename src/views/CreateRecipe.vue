<template>
  <main>
    <Draggable v-for="element in $recipeModeler.recipe" :key="element" />
    <InputDraggable :ingredientObject="inputObject.ingredientObject" />
    <OutputDraggable :ingredientObject="outputObject.ingredientObject" />
    <TransformerDraggable :ingredientObject="transformerObject.ingredientObject" />
    <AlgorithmDraggable :ingredientObject="algorithmObject.ingredientObject" />
    <button @click="addDraggable">Add Draggable</button>
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
import { ResourceTypeNullObject, ResourceTypes, createTransformerNullObject, Transformers, createOptimizationAlgorithmNullObject, OptimizationAlgorithms } from '@/apis/rembrandt/rembrandt';
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
  public inputObject: InputIngredient = {
    ingredientObject: ResourceTypeNullObject,
  };

  public outputObject: OutputIngredient = {
    ingredientObject: ResourceTypeNullObject,
  };

  public transformerObject: TransformerIngredient = {
    ingredientObject: createTransformerNullObject(),
  };

  public algorithmObject: AlgorithmIngredient = {
    ingredientObject: createOptimizationAlgorithmNullObject(),
  };
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public addDraggable() {
    this.$recipeModeler.addRecipeElement();
  }

  public async mounted() {
    const resourceTypes = await ResourceTypes.get();
    this.inputObject.ingredientObject = resourceTypes[0];
    this.outputObject.ingredientObject = resourceTypes[1];
    const transformers = await Transformers.get();
    this.transformerObject.ingredientObject = transformers[0];
    const algorithms = await OptimizationAlgorithms.get();
    this.algorithmObject.ingredientObject = algorithms[0];
  }
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
@import "../colors.less";
</style>

