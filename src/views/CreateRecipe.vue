<template>
  <main>
    <Draggable v-for="element in $recipeModeler.recipe" :key="element" />
    <Draggable />
    <InputDraggable :ingredientObject="inputObject.ingredientObject" />
    <OutputDraggable :ingredientObject="inputObject.ingredientObject" />
    <button @click="addDraggable">Add Draggable</button>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Draggable from '@/components/Draggable.vue';
import InputDraggable from '@/components/InputDraggable.vue';
import OutputDraggable from '@/components/OutputDraggable.vue';
import { InputIngredient, OutputIngredient } from '@/plugins/RecipeModeler';
import { ResourceTypeNullObject, ResourceTypes } from '@/apis/rembrandt/rembrandt';
import interact from 'interactjs';

@Component({
  components: {
    Draggable,
    InputDraggable,
    OutputDraggable,
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
  }
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
@import "../colors.less";
</style>

