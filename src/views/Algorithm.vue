<template>
  <main>
    <ViewHeader :title="algorithm.name" :backLink="{ link: { name: 'algorithms' } }"/>

    <ListSection class="preview-container" :list="algorithmList"/>

    <div class="row">
      <ListSection title="Attributes" :list="optimizationAlgorithmsAttributesList"/>
      <ListSection title="Actions" :list="optimizationAlgorithmActionsList"/>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  createOptimizationAlgorithmNullObject,
  OptimizationAlgorithms,
  OptimizationAlgorithm,
} from '@/apis/rembrandt/rembrandt';
import ViewHeader from '@/components/ViewHeader.vue';
import ListSection from '@/components/ListSection.vue';
import { ListEntry } from '@/components/Li.vue';
import Utils from '@/utils/Utils';
import { NotificationLevel } from '@/interfaces/Notification';

@Component({
  components: {
    ListSection,
    ViewHeader,
  },
})
export default class Algorithm extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public algorithm: OptimizationAlgorithm;

  public get algorithmList(): ListEntry[] {
    return Utils.optimizationAlgorithmsToList([ this.algorithm ]);
  }

  public get optimizationAlgorithmsAttributesList(): ListEntry[] {
    return Utils.optimizationAlgorithmsAttributesToList(this.algorithm);
  }

  public get optimizationAlgorithmActionsList(): ListEntry[] {
    const optimizationAlgorithmActions = [];

    optimizationAlgorithmActions.push({
      id: '1',
      firstValue: 'Delete Algorithm',
      link: {
        onClick: this.deleteOptimizationAlgorithm,
      },
    });

    return optimizationAlgorithmActions;
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.algorithm = createOptimizationAlgorithmNullObject();
  }
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.algorithm = await OptimizationAlgorithms.getOne(this.$route.params.id);
    } catch (e) {
      this.$notifications.create(e);
    }
  }

  public async deleteOptimizationAlgorithm(): Promise<void> {
    try {
      await OptimizationAlgorithms.delete(this.algorithm.id!);
      this.$notifications.create({
        title: `Algorithm '${this.algorithm.name}' has been deleted.`,
        details: '',
        level: NotificationLevel.Success,
        timestamp: new Date(),
      });
      this.$router.push({ name: 'algorithms' });
    } catch (e) {
      this.$notifications.create(e);
    }
  }
  // endregion

  // region private methods
  // endregion
}
</script>
