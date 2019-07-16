<template>
  <main>
    <ViewHeader :title="execution.identifier" :backLink="{ link: { name: 'executions' } }"/>
    <ListSection class="preview-container" :list="executionList"/>
    <ListSection title="Ingredient States" :list="executionStatesList"/>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  OptimizationExecution,
  OptimizationExecutions,
  createOptimizationExecutionNullObject,
} from '@/apis/rembrandt/rembrandt';
import ViewHeader from '@/components/ViewHeader.vue';
import ListSection from '@/components/ListSection.vue';
import { ListEntry } from '@/components/Li.vue';
import Utils from '@/utils/Utils';

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
  public execution: OptimizationExecution;

  public get executionList(): ListEntry[] {
    return Utils.optimizationExecutionsToList([ this.execution ]);
  }


  public get executionStatesList(): ListEntry[] {
    return Utils.optimizationExecutionStatesToList(this.execution);
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.execution = createOptimizationExecutionNullObject();
  }
  // endregion

  // region public methods
  public async mounted() {
    try {
      this.execution = await OptimizationExecutions.getOne(this.$route.params.id);
    } catch (e) {
      this.$notifications.create(e);
    }
  }
  // endregion

  // region private methods
  // endregion
}
</script>
