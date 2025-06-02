import { buildDepositPayload } from './buildDepositPayload';

import { AccountOption, DepositFormValues } from 'models/IDepositInfo';

describe('buildDepositPayload', () => {
  const mockAccounts: AccountOption[] = [
    {
      accountId: '101',
      iban: 'AZ00TEST000000000001',
      currency: 'PLN',
      balance: '1200',
    },
    {
      accountId: '102',
      iban: 'AZ00TEST000000000002',
      currency: 'USD',
      balance: '1000',
    },
  ];

  it('should return correct payload when valid data is provided', () => {
    const formData: DepositFormValues = {
      account: 'AZ00TEST000000000002',
      amount: 1500,
    };

    const depositId = 7;

    const result = buildDepositPayload(formData, mockAccounts, depositId);

    expect(result).toEqual({
      accountId: "102",
      depositId: 7,
      amount: 1500,
    });
  });

  it('should throw an error if selected account is not found', () => {
    const formData: DepositFormValues = {
      account: 'AZ00INVALID0000000000',
      amount: 1000,
    };

    expect(() => buildDepositPayload(formData, mockAccounts, 5)).toThrowError(
      'Selected account not found',
    );
  });

  it('should convert string amount to number', () => {
    const formData: DepositFormValues = {
      account: 'AZ00TEST000000000001',
      amount: 2000.75,
    };

    const result = buildDepositPayload(formData, mockAccounts, 9);

    expect(result.amount).toBeCloseTo(2000.75);
    expect(typeof result.amount).toBe('number');
  });
});
