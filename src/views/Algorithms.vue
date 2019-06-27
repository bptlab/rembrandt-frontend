<template>
  <main>
    <ListSection title="Algorithms" :list="algorithmList" />
    <SmallButton :link="{link: { name: 'create-algorithm' } }" class="create-algorithm-button">
      <i class="fas fa-plus"></i>
    </SmallButton>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { OptimizationAlgorithms, OptimizationAlgorithm, ResourceTypes } from '@/apis/rembrandt/rembrandt';
import ListSection from '@/components/ListSection.vue';
import SmallButton from '@/components/SmallButton.vue';
import { ListEntry } from '@/components/Li.vue';
import Utils from '@/utils/Utils';

@Component({
  components: {
    ListSection,
    SmallButton,
  },
})
export default class Algorithms extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public algorithms: OptimizationAlgorithm[] = [];

  public get algorithmList(): ListEntry[] {
    return Utils.optimizationAlgorithmsToList(this.algorithms);
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.algorithms = await OptimizationAlgorithms.get();
    } catch (e) {
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

.create-algorithm-button {
  position: fixed;
  bottom: 0;
  right: @spacing;
}
</style>

