<template>
  <main class="send-Query">
    <ViewHeader title="Please insert a SQL Query" />
    <Input
      :value.sync="metric.query"
      name="Query"
      placeholder="SELECT * FROM allocation_log WHERE ..."
      :autofocus="true"
    />
    <Button text="Send Query" :onClick="sendQuery" />
    <ListSection
      v-for="resultEntry in result"
      :title="resultEntry.resource"
      :key="resultEntry.resource"
      :list="resultEntryToList(resultEntry)"
    />
  </main>
</template>

<script lang="ts">
import {
  Metric,
  Metrics,
  createMetricNullObject,
  MetricResult,
  MetricResultNullObject,
  MetricResultEntry,
} from '@/apis/rembrandt/rembrandt';
import { Component, Mixins } from 'vue-property-decorator';
import ViewHeader from '@/components/ViewHeader.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import ListSection from '@/components/ListSection.vue';
import Li, { ListEntry } from '@/components/Li.vue';
import { NotificationLevel } from '@/interfaces/Notification';
import Translate from '@/mixins/Translate';
import Utils from '@/utils/Utils';

@Component({
  components: {
    ViewHeader,
    Input,
    Button,
    ListSection,
    Li,
  },
})
export default class SendMetric extends Mixins(Translate) {
  // region public static methods

  // endregion

  // region private static methods
  // endregion

  // region public members
  public metric: Metric;
  public metricResult: MetricResult;
  public result: any = null;

  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.metric = createMetricNullObject();
    this.metric.query = 'select * from allocation_log where id =2;';
    this.metricResult = MetricResultNullObject;
  }
  // endregion

  // region public methods

  public resultEntryToList(resultEntry: MetricResultEntry): ListEntry[] {
    return Utils.resultEntryAttributesToList(resultEntry);
  }

  public async sendQuery(): Promise<void> {
    try {
      this.result = await Metrics.create(this.metric);
      console.log(this.result);
      this.$notifications.create({
        title: `Query '${this.metric.query}' has been sent`,
        details: '',
        level: NotificationLevel.Success,
        timestamp: new Date(),
      });
    } catch (e) {
      this.$notifications.create(e);
    }
  }
  // endregion
}
</script>
