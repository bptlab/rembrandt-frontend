import Vue from 'vue';
import { NotificationCenter, Notification } from './plugins/Notification';

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $notifications: NotificationCenter;
  }
}
