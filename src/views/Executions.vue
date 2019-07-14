<template>
  <main>
    <form class="search-form">
      <Select
        :value.sync="selectedRecipe"
        placeholder="All Recipes"
        name="Recipe"
        :options="recipeSelections" />
    </form>
    <ListSection
      :key="recipe.id"
      v-for="recipe in filteredRecipes"
      :title="recipe.name"
      :list="executionsForRecipe(recipe)" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { OptimizationExecution, OptimizationExecutions, Recipe, Recipes } from '@/apis/rembrandt/rembrandt';
import ListSection from '@/components/ListSection.vue';
import Select, { Option } from '@/components/Select.vue';
import { ListEntry } from '@/components/Li.vue';
import Link from '@/components/Link.vue';
import Utils from '@/utils/Utils';

@Component({
  components: {
    ListSection,
    Select,
    Link,
  },
})
export default class Executions extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public executions: OptimizationExecution[] = [];
  public recipes: Recipe[] = [];
  public selectedRecipe: string = '';

  public get executionsList(): ListEntry[] {
    return Utils.optimizationExecutionsToList(this.executions);
  }

  public get recipeSelections(): Option[] {
    return this.recipes.map((recipe) => {
      return {
        value: recipe.name,
      };
    });
  }

  public get filteredRecipes(): Recipe[] {
    if (this.selectedRecipe.length > 0) {
      return this.recipesWithExecutions.filter((resourceType) => this.selectedRecipe.includes(resourceType.name));
    } else {
      return this.recipesWithExecutions;
    }
  }

  // get all resourcetypes with instances
  public get recipesWithExecutions(): Recipe[] {
    return this.recipes.filter((recipe) => this.executionsForRecipe(recipe).length);
  }

  // match resourceinstance and corresponding type and search filter
  public executionsForRecipe(recipe: Recipe): ListEntry[] {
    const resourcesPerType = this.executions.filter((execution) => (execution.recipe.id === recipe.id));
    return Utils.optimizationExecutionsToList(resourcesPerType);
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.executions = await OptimizationExecutions.get();
      this.recipes = await Recipes.get();
    } catch (e) {
      this.$notifications.create(e);
    }
  }
  // endregion

  // region private methods
  // endregion
}
</script>
