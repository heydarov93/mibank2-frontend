interface IDepositBase {
  accountId: string;
  depositId: number;
  amount: number;
}

export type TCreateUserDepositRequest = IDepositBase;

export interface IUserDepositResponse extends IDepositBase {
  id: number;
}