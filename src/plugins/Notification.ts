import _Vue from 'vue';
import ApiError from '@/apis/jsonapi/ApiError';

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

  get notifications(): ApiError[] {
    return this.storeVM.$data.notifications;
  }
  // endregion

  // region private members
  // endregion

  // region constructor
  // endregion

  // region public methods
  public create(error: ApiError): void {
    error.timestamp = new Date();
    this.notifications.push(error);
  }
  // endregion

  // region private methods
  // endregion
}
