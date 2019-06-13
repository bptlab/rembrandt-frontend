export enum ErrorLevel {
  Info = 'info',
  Warning = 'warning',
  Critical = 'critical',
}

export default class ApiError extends Error {
  // region public static methods
  // endregion

  // region private static methods
  // endregion

  // region public members
  public title: string;
  public details: string;
  public level: ErrorLevel;
  public timestamp: Date;
  // endregion

  // region private members
  // endregion

  // region constructor
  constructor(title: string, details: string, level: ErrorLevel, ...params: any[]) {
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
