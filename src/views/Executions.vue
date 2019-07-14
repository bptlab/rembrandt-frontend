<template>
  <main>
    <ListSection title="Executions" :list="executionsList" />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { OptimizationExecution, OptimizationExecutions } from '@/apis/rembrandt/rembrandt';
import ListSection from '@/components/ListSection.vue';
import { ListEntry } from '@/components/Li.vue';
import Utils from '@/utils/Utils';

@Component({
  components: {
    ListSection,
  },
})
export default class Executions extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public executions: OptimizationExecution[] = [];

  public get executionsList(): ListEntry[] {
    return Utils.optimizationExecutionsToList(this.executions);
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
    } catch (e) {
      this.$notifications.create(e);
    }
  }
  // endregion

  // region private methods
  // endregion
}
</script>
