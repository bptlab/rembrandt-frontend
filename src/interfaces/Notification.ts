export enum NotificationLevel {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Critical = 'critical',
}

export default interface Notification {
  title: string;
  details: string;
  level: NotificationLevel;
  timestamp: Date;
}
