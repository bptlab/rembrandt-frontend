<template>
  <div class="view-header">
    <h1>{{this.title}}</h1>
    <div class="back-link-container">
      <Link :linkOptions="backLink">&#60; Go Back</Link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Link, { LinkOptions } from '@/components/Link.vue';

@Component({
  components: {
    Link,
  },
})
export default class ViewHeader extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop(String)
  public title!: string;

  @Prop(Object)
  public backLink!: LinkOptions;
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
.view-header {
  h1 {
    font-size: 30px;
    margin-top: 40px;
  }

  .back-link-container {
    margin-top: 20px;
    margin-bottom: 40px;
  }
}
</style>
