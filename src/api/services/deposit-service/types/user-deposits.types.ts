import { USER_DEPOSIT_TAGS } from 'api/constants/tags';

interface IDepositBase {
  accountId: string;
  depositId: number;
  amount: number;
}

export type TCreateUserDepositRequest = IDepositBase;
export type TUserDepositTag =
  (typeof USER_DEPOSIT_TAGS)[keyof typeof USER_DEPOSIT_TAGS];

export interface IUserDepositResponse extends IDepositBase {
  id: number;
}
