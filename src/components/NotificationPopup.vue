<template>
  <ListSection class="notification-popup" v-if="visible">
    <Li
      v-for="notification in notificationList"
      :key="notification.id"
      :class="notification.level"
      :listEntry="notification"
    />
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
export default class NotificationPopup extends Vue {
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
    const newNotifications = this.$notifications.notifications.filter(
      (notification) => 5000 > this.lastUpdate - notification.timestamp.getTime(),
    );
    return Utils.notificationsToList(newNotifications);
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
@import "../colors.less";

section.notification-popup {
  position: fixed;
  top: 85px;
  right: @spacing;
  width: 400px;
  text-align: left;
  margin: 0;
  padding: 0;
  background: @tertiary-bg;
  border-radius: 10px;

  ul {
    margin: 0;

    li {
      background-position: 0 0;
      background-size: 5px 100%;
      background-repeat: no-repeat;

      &.critical {
        background-image: linear-gradient(to right, red, red);
      }
      &.warning {
        background-image: linear-gradient(to right, orange, orange);
      }
      &.info {
        background-image: linear-gradient(to right, white, white);
      }
      &.success {
        background-image: linear-gradient(to right, green, green);
      }
    }
  }
}
</style>
