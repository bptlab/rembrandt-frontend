import Notification, { NotificationLevel } from '@/interfaces/Notification';

export default class ApiError extends Error implements Notification {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public title: string;
  public details: string;
  public level: NotificationLevel;
  public timestamp: Date;
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor(title: string, details: string, level: NotificationLevel, ...params: any[]) {
    super(...params);
    this.title = title;
    this.details = details;
    this.level = level;
    this.timestamp = new Date();
  }
  // endregion

  // region public methods
  // endregion

  // region private methods
  // endregion
}
