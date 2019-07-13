<template>
  <main class="type">
    <ViewHeader :title="this.recipe.name" :backLink="{ link: { name: 'recipes' } }" />

    <div class="row">
      <ListSection title="Attributes" :list="recipeAttributeList" />
      <ListSection title="Actions" :list="recipeActionsList" />
    </div>

  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  ResourceInstances,
  ResourceInstance,
  ResourceInstanceNullObject,
  ResourceTypes,
  Recipe,
  createRecipeNullObject,
  Recipes,
} from '@/apis/rembrandt/rembrandt';
import { ListEntry } from '@/components/Li.vue';
import ListSection from '@/components/ListSection.vue';
import ViewHeader from '@/components/ViewHeader.vue';
import Utils from '@/utils/Utils';
import { NotificationLevel } from '@/interfaces/Notification';

@Component({
  components: {
    ListSection,
    ViewHeader,
  },
})
export default class Resource extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public recipe: Recipe;

  public get recipeAttributeList(): ListEntry[] {
   return [];
   // return Utils.recipeAttributesToList(this.recipe);
  }

  public get recipeActionsList(): ListEntry[] {
    const recipeActions = [];

    recipeActions.push(
      {
        id: '1',
        firstValue: 'Create a Recipe',
        link: {
          link: { name: 'create-recipe'},
        },
      },
      {
      id: '2',
      firstValue: 'Delete Recipe',
      link: {
        onClick: this.deleteRecipe,
      },
      });
    return recipeActions;
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.recipe = createRecipeNullObject();
  }
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.recipe = await Recipes.getOne(this.$route.params.id);
      console.log(this.recipe);
    } catch (e) {
      this.$notifications.create(e);
    }
  }

public async deleteRecipe(): Promise<void> {
  try {
    await Recipes.delete(this.recipe.id!);
    this.$notifications.create({
      title: `Recipe '${this.recipe.name}' has been deleted.`,
      details: '',
      level: NotificationLevel.Success,
      timestamp: new Date(),
    });
    this.$router.push({ name: 'recipes' });
  } catch (e) {
    this.$notifications.create(e);
  }
}

  // endregion

  // region private methods
  // endregion
}
</script>
