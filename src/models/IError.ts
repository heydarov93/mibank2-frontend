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
