import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

import { useGetUserAccountByIBANQuery } from 'api/services/account-service/accounts.api';
import { useGetUserIdQuery } from 'api/services/user-account-service/get-user-id.api';
import { IBAN_PATTERN } from 'constants/validation/patterns';
import { ISelectFieldOption } from 'models/ISelectField';
import { formatCurrency } from 'utils/formatters/currencyFormatter';
import { formatWithPattern } from 'utils/formatters/textFormatter';

export const useUserAccounts = () => {
  const { data: userIdData } = useGetUserIdQuery();
  const { data, isLoading, ...options } = useGetUserAccountByIBANQuery(
    userIdData?.userId ? { userId: userIdData.userId } : skipToken,
  );
  const accountOptions: ISelectFieldOption[] = useMemo(
    () =>
      Array.from(data ?? [])
        .sort(
          (a, b) =>
            new Date(a.accountStartDate).getTime() -
            new Date(b.accountStartDate).getTime(),
        )
        .map((account) => ({
          value: account.userAccountId,
          label: formatWithPattern(account.ibanNum, IBAN_PATTERN),
          secondaryLabel: formatCurrency(
            account.currency,
            account.currentAccountBalance.toString(),
          ),
        })),
    [data],
  );

  return { data: accountOptions, isLoading, ...options };
};
