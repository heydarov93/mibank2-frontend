export interface IErrorData {
  data: {
    remainingAttempts: number;
    message: string;
    blockTimeRemaining: number;
    isBlocked: boolean;
  };
  status: number;
}
