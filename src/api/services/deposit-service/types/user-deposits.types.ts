import { USER_DEPOSIT_TAGS } from 'constants/api/tags';

interface IDepositBase {
  accountId: string;
  depositId: number;
  amount: number;
}

export interface IUserDepositResponse extends IDepositBase {
  id: number;
}

export type TCreateUserDepositRequest = IDepositBase;
export type TUserDepositTag =
  (typeof USER_DEPOSIT_TAGS)[keyof typeof USER_DEPOSIT_TAGS];
