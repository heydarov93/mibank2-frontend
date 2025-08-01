import {
  IUserCardAccount,
  IUserCardAccountOption,
  IUserIBANAccount,
  IUserIBANAccountOption,
} from 'models/IAccount';

export function createOptions(
  accounts: IUserCardAccount[] | IUserIBANAccount[],
): IUserCardAccountOption[] | IUserIBANAccountOption[] | [] {
  if (accounts.length === 0) return [];

  const options = accounts.map((account) => ({
    ...account,
    label: `${account.currency} ${account.balance.toFixed(2)}`,
  }));

  if (accounts[0].type === 'iban') {
    return options as IUserIBANAccountOption[];
  } else {
    return options as IUserCardAccountOption[];
  }
}
