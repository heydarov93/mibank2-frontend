import {
  IUserCardAccount,
  IUserIBANAccount,
} from '../components/organisms/TransferView/hooks/useTransferAccounts';

export interface IUserCardAccountOption extends IUserCardAccount {
  label: string;
}
export interface IUserIBANAccountOption extends IUserIBANAccount {
  label: string;
}
