import { IUserCardAccount, IUserIBANAccount } from '../hooks/useAccounts';

export interface IUserCardAccountOption extends IUserCardAccount {
  label: string;
}
export interface IUserIBANAccountOption extends IUserIBANAccount {
  label: string;
}
