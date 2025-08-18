import { USER_DEPOSIT_TAGS } from 'constants/api/tags';

export interface IDepositCreate {
  accountId: string;
  depositId: number;
  amount: number;
}

export interface IDepositBase {
  id: string;
  userId: string;
  accountNumber: string;
  depositId: string;
  startDate: string;
  endDate: string;
  currentBalance: number;
  status: string;
  timeLeft: number;
}

export interface IUserDepositDetailed extends IDepositBase {
  name: string;
  amount: number;
  currency: IDepositBase['currentBalance'];
  type: string;
  interestRate: number;
  withdrawalFee: number;
  withdrawalLimit: number;
  capitalizationRate: number;
}

export type TCreateUserDepositRequest = IDepositCreate;
export type TUserDepositTag =
  (typeof USER_DEPOSIT_TAGS)[keyof typeof USER_DEPOSIT_TAGS];
