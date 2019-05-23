<template>
  <section class="list">
    <h1 v-if="title">{{title}}</h1>
    <ul v-if="list">
      <Li v-for="element in this.list" :key="element.id" :listEntry="element" />
    </ul>
    <ul v-else>
      <slot />
    </ul>
  </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Li, { ListEntry } from '@/components/Li.vue';

@Component({
  components: {
    Li,
  },
})
export default class ListSection extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop(String)
  public title!: string;

  @Prop(Array)
  public list!: ListEntry[];
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
@import "../colors";

section.list {
  h1 {
    margin-top: 40px;
    font-size: 19px;
    font-weight: 800;
  }

  ul {
    list-style: none;
    padding: 0;
    border-radius: 10px;
    background-color: @secondary-bg;
    box-shadow: 0 0 0.25em 0.1em @primary-shadow;
    margin: @spacing 0;
  }
}
</style>
