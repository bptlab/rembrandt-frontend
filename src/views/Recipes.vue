<template>
  <main>
    <ListSection title="Recipes" :list="recipesList" />
    <SmallButton :link="{link: { name: 'create-recipe' } }" class="create-recipe-button">
      <i class="fas fa-plus"></i>
    </SmallButton>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Recipe, Recipes } from '@/apis/rembrandt/rembrandt';
import { ListEntry } from '@/components/Li.vue';
import ListSection from '@/components/ListSection.vue';
import Link from '@/components/Link.vue';
import Utils from '@/utils/Utils';
import SmallButton from '@/components/SmallButton.vue';

@Component({
  components: {
    ListSection,
    Link,
    SmallButton,
  },
})
export default class Types extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public recipes: Recipe[] = [];

  public get recipesList(): ListEntry[] {
    return Utils.recipesToList(this.recipes);
  }

  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.recipes = await Recipes.get();
      console.log(this.recipes);
    } catch (e) {
      console.log('woops something went wrong');
      this.$notifications.create(e);
    }
  }
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
@import "../colors.less";

.create-recipe-button {
  position: fixed;
  bottom: 0;
  right: @spacing;
}
</style>

