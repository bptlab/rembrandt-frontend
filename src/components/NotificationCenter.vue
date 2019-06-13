<template>
  <ListSection class="notifications" title="Notifications" v-if="visible">
    <Li v-for="notification in notificationList" :key="notification.id" :class="notification.level" :listEntry="notification"/>
  </ListSection>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ListSection from '@/components/ListSection.vue';
import Li, { ListEntry } from '@/components/Li.vue';
import Utils from '@/utils/Utils';

@Component({
  components: {
    ListSection,
    Li,
  },
})
export default class NotificationCenter extends Vue {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  @Prop(Boolean)
  public visible!: boolean;

  private lastUpdate: number = Number.MAX_SAFE_INTEGER;
  private timer: number = 0;

  get notificationList(): ListEntry[] {
    // this automatically updates the notification list when lastupdate ist changed
    // tslint:disable-next-line
    this.lastUpdate;
    return Utils.notificationsToList(this.$notifications.notifications);
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public created() {
    this.timer = setInterval(this.updateNotificationList, 1000);
  }

  public updateNotificationList() {
    this.lastUpdate = new Date().getTime();
  }

  public beforeDestroy() {
    clearInterval(this.timer);
  }
  // endregion

  // region private methods
  // endregion
}
</script>

<style lang="less">
@import '../colors.less';

section.notifications {
  background: @tertiary-bg;
  box-shadow: @shadow;
  position: fixed;
  top: 85px;
  right: @spacing;
  width: 400px;
  text-align: left;
  padding: 0 20px 20px;
  border-radius: 10px;

  ul {
    max-height: 500px;
    overflow-y: scroll;

    li {
      background-position: 0 0;
      background-size: 5px 100%;
      background-repeat: no-repeat;

      &.critical, &:hover {
        background-image: linear-gradient(to right, red, red);
      }
      &.warning {
        background-image: linear-gradient(to right, orange, orange);
      }
      &.info {
        background-image: linear-gradient(to right, white, white);
      }
    }
  }
}
</style>
