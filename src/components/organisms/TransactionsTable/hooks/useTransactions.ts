import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useGetTransactionsByUserIdMutation } from 'api/services/account-service/transactions.api';
import { useGetUserIdQuery } from 'api/services/user-account-service/get-user-id.api';
import { DATE_FORMATS } from 'constants/business/date';
import { SORT_ORDER } from 'constants/business/sortOrder';
import { Transaction } from 'models/ITransactionInfo';
import { formatDateByPattern } from 'utils';
import { TTransactionFiltersValues } from 'validation';

interface IUseTransactionsParams {
  page: number;
  count: number;
  currentFilters: TTransactionFiltersValues;
}

type TEmptyStateText = { title?: string; message?: string };
interface IShowEmptyState {
  offline: TEmptyStateText;
  noTransactions: TEmptyStateText;
  noMatches: TEmptyStateText;
}

export function useTransactions({
  page,
  count,
  currentFilters,
}: IUseTransactionsParams) {
  const [
    getTransactions,
    { isLoading: isTransactionsListLoading, isError, isSuccess },
  ] = useGetTransactionsByUserIdMutation();

  const [transactionsList, setTransactionList] = useState<Transaction[]>([]);

  const [transactionsLength, setTransactionsLength] = useState(0);

  const [numberOfAllTransactionsInDb, setNumberOfAllTransactionsInDb] =
    useState(0);

  const [dataSortOrder, setDataSortOrder] = useState<'ASC' | 'DESC'>(
    SORT_ORDER.DESC,
  );

  const { data: userIdObject, isLoading: isGetUserIdLoading } =
    useGetUserIdQuery();

  const isLoading = isGetUserIdLoading || isTransactionsListLoading;
  const { t } = useTranslation('translation', {
    keyPrefix: 'TransactionsHistoryPage',
  });

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

  useEffect(() => {
    if (!userIdObject) return;

    // Request API and see whether user has transactions at all
    // Display a specific message if user doesn't have any transaction
    getTransactions({
      userId: userIdObject.userId,
      page: 0,
      count: 10,
    }).then((res) => {
      'data' in res && setNumberOfAllTransactionsInDb(res.data.totalElements);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIdObject]);

  // TODO: Send `templatesId` as well when it's supported by the backend
  const { card, transactionsType, startDate, endDate } = currentFilters;
  useEffect(() => {
    const sources = card?.filter(
      (c): c is string => typeof c === 'string' && c !== 'All cards',
    );
    const transactionType =
      transactionsType !== 'ALL' ? transactionsType : undefined;

    async function fetchTransactionsHistory() {
      if (!userIdObject) return;

      const response = await getTransactions({
        userId: userIdObject.userId,
        page,
        count,
        sources,
        transactionType,
        fromDate: formatDateByPattern(startDate || '', DATE_FORMATS.YYYY_MM_DD),
        toDate: formatDateByPattern(endDate || '', DATE_FORMATS.YYYY_MM_DD),
        dataSortOrder,
      });

      if ('data' in response) {
        setTransactionList(response.data.data);
        setTransactionsLength(response.data.totalElements);
      }
    }

    fetchTransactionsHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    page,
    count,
    userIdObject,
    card,
    transactionsType,
    startDate,
    endDate,
    dataSortOrder,
  ]);

  return {
    transactionsList,
    transactionsLength,
    emptyTransactionsTableText,
    isLoading,
    isError,
    isSuccess,
    setDataSortOrder,
  };
}
