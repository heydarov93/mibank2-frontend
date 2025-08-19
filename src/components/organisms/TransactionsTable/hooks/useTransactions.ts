import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetTransactionsByUserIdQuery } from 'api/services/account-service/transactions.api';
import { useGetUserIdQuery } from 'api/services/user-account-service/get-user-id.api';
import { DATE_FORMATS } from 'constants/business/date';
import { SORT_ORDER } from 'constants/business/sortOrder';
import { IRawTransaction } from 'models/ITransaction';
import { formatDateByPattern } from 'utils';
import { TTransactionFiltersValues } from 'validation';

interface UseTransactionsParams {
  page: number;
  count: number;
  currentFilters: TTransactionFiltersValues;
}

export type TEmptyStateText = { title?: string; message?: string };

interface IShowEmptyState {
  offline: TEmptyStateText;
  noTransactions: TEmptyStateText;
  noMatches: TEmptyStateText;
}

export const useTransactions = ({
  page,
  count,
  currentFilters,
}: UseTransactionsParams) => {
  const [dataSortOrder, setDataSortOrder] = useState<'ASC' | 'DESC'>(
    SORT_ORDER.DESC,
  );
  const { data: userIdObject, isLoading: isGetUserIdLoading } =
    useGetUserIdQuery();

  const { card, transactionsType, startDate, endDate } = currentFilters;
  const sources = card?.filter(
    (c): c is string => typeof c === 'string' && c !== 'All cards',
  );
  const transactionType =
    transactionsType !== 'ALL' ? transactionsType : undefined;

  const {
    data: transactionsData,
    isLoading: isTransactionsListLoading,
    isError,
    isSuccess,
  } = useGetTransactionsByUserIdQuery(
    {
      // userId: Number(userIdObject?.userId),
      userId: 1002,
      page,
      count,
      sources,
      transactionType,
      fromDate: startDate
        ? formatDateByPattern(startDate, DATE_FORMATS.YYYY_MM_DD)
        : undefined,
      toDate: endDate
        ? formatDateByPattern(endDate, DATE_FORMATS.YYYY_MM_DD)
        : undefined,
      dataSortOrder,
    },
    { skip: !userIdObject },
  );

  const { data: totalTransactionsData, isLoading: isTotalTransactionsLoading } =
    useGetTransactionsByUserIdQuery(
      {
        // userId: Number(userIdObject?.userId),
        userId: 1002,
        page: 0,
        count: 1,
      },
      { skip: !userIdObject },
    );

  const transactionsList: IRawTransaction[] = transactionsData?.data ?? [];
  const transactionsLength = transactionsData?.totalElements ?? 0;

  const isLoading =
    isGetUserIdLoading ||
    isTransactionsListLoading ||
    isTotalTransactionsLoading;

  const { t } = useTranslation('translation', {
    keyPrefix: 'TransactionsHistoryPage',
  });

  const numberOfAllTransactionsInDb = totalTransactionsData?.totalElements ?? 0;

  const isOffline = !navigator.onLine;
  const showEmptyState: IShowEmptyState = {
    offline: isOffline
      ? {
          title: t('emptyStatesContent.offline.title'),
          message: t('emptyStatesContent.offline.message'),
        }
      : {},
    noTransactions:
      !isLoading && numberOfAllTransactionsInDb === 0
        ? {
            title: t('emptyStatesContent.noTransactions.title'),
            message: t('emptyStatesContent.noTransactions.message'),
          }
        : {},
    noMatches:
      !isLoading &&
      transactionsLength === 0 &&
      numberOfAllTransactionsInDb !== 0
        ? {
            title: t('emptyStatesContent.noMatches.title'),
            message: t('emptyStatesContent.noMatches.message'),
          }
        : {},
  };

  const emptyTransactionsTableText = [
    showEmptyState.offline,
    showEmptyState.noMatches,
    showEmptyState.noTransactions,
  ].find((obj) => obj.title);

  return {
    transactionsList,
    transactionsLength,
    emptyTransactionsTableText,
    isLoading,
    isError,
    isSuccess,
    setDataSortOrder,
  };
};
