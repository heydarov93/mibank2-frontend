export interface IErrorData {
  data: {
    exceptionMessage: string;
    blockTimeRemaining: number;
    blocked: boolean;
    expiredTimer: number;
  };
  status: number;
  originalStatus?: number;
}

export interface IBackOfficeErrorData {
  data: string;
  status: number;
  error: string;
  originalStatus: number;
}

export interface ILegalEntityValidationError extends IErrorData {
  existError: Array<[string, boolean]>;
}
