import _Vue from 'vue';
import Notification from '@/interfaces/Notification';

export default function install(Vue: typeof _Vue, options = {}) {
  Vue.prototype.$notifications = new NotificationCenter();
}

// tslint:disable-next-line: max-classes-per-file
export class NotificationCenter {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public storeVM = new _Vue({
    data() {
      return {
        notifications: [],
      };
    },
  });

  get notifications(): Notification[] {
    return this.storeVM.$data.notifications;
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public create(notification: Notification): void {
    notification.timestamp = new Date();
    this.notifications.push(notification);
  }
  // endregion

  // region private methods
  // endregion
}
