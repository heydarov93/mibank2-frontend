import { IAccountOption } from 'models/IAccount';
import { IOpenDepositFormData } from 'models/IDeposit';

export interface DepositPayload {
  accountId: string;
  depositId: number;
  amount: number;
}

export const buildDepositPayload = (
  formData: IOpenDepositFormData,
  accountOptions: IAccountOption[],
  depositId: number,
) => {
  const selectedAccount = accountOptions.find(
    (acc) => acc.iban === formData.account,
  );

  if (!selectedAccount) {
    throw new Error('Selected account not found');
  }

  const payload: DepositPayload = {
    accountId: selectedAccount.accountId,
    depositId,
    amount: Number(formData.amount),
  };

  return payload;
};
