import { skipToken } from '@reduxjs/toolkit/query';
import { useMemo } from 'react';

import { useGetIBANAccountsQuery } from 'api/accountsApi';
import { useGetUserIdQuery } from 'api/getUserIdApi';
import { SelectFieldOption } from 'components/molecules';
import { IBAN_PATTERN } from 'constants/inputPatterns';
import { formatCurrency } from 'utils/formatters/currencyFormatter';
import { formatWithPattern } from 'utils/formatters/textFormatter';

export const useGetAccountOptions = () => {
  const { data: userIdData } = useGetUserIdQuery();
  const { data, isLoading, ...options } = useGetIBANAccountsQuery(
    userIdData?.userId ? { userId: userIdData.userId } : skipToken,
  );
  const accountOptions: SelectFieldOption[] = useMemo(
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
