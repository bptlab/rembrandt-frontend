<template>
  <main class="read-Log">
    <ViewHeader title="Please insert the Path to the event log" :backLink="{ link: { name: 'query' } }"/>
    <Input
      :value.sync="path.path"
      name="File Path"
      placeholder="C:\\User\\eventlog.xes"
      :autofocus="true"
    />
    <Button text="read event log" :onClick="readLog" />
  </main>
</template>

<script lang="ts">

import { Component, Mixins } from 'vue-property-decorator';
import ViewHeader from '@/components/ViewHeader.vue';
import Input from '@/components/Input.vue';
import Button from '@/components/Button.vue';
import { NotificationLevel } from '@/interfaces/Notification';
import Translate from '@/mixins/Translate';
import Utils from '@/utils/Utils';
import {Path, Paths, PathNullObject, createPathNullObject} from '@/apis/rembrandt/rembrandt';

@Component({
  components: {
    ViewHeader,
    Input,
    Button,
  },
})
export default class readLog extends Mixins(Translate) {
  // region public static methods

  // endregion

  // region private static methods
  // endregion

  // region public members
    public path: Path;
    public result: any = null;
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor() {
    super();
    this.path = createPathNullObject();
  }
  // endregion

  // region public methods

  public async readLog(): Promise<void> {
    try {
      this.result = await Paths.create(this.path);
      console.log(this.path);
      this.$notifications.create({
        title: `Log is read from ${this.path}`,
        details: '',
        level: NotificationLevel.Success,
        timestamp: new Date(),
      });
      this.$router.push({ name: 'query' });
    } catch (e) {
      this.$notifications.create(e);
    }
  }
  // endregion
}
</script>
