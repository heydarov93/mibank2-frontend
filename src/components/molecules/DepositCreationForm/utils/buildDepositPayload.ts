import { AccountOption, DepositFormValues } from 'models/IDepositInfo';

export interface DepositPayload {
  accountId: string;
  depositId: number;
  amount: number;
}

export const buildDepositPayload = (
  formData: DepositFormValues,
  accountOptions: AccountOption[],
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
