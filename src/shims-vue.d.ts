import Vue from 'vue';
import { NotificationCenter } from './plugins/Notification';

declare module '*.vue' {
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $notifications: NotificationCenter;
  }
}
