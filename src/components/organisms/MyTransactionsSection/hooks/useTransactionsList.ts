import { useGetTransactionsByUserIdQuery } from 'api/services/account-service/transactions.api';
import { useGetUserIdQuery } from 'api/services/user-account-service/get-user-id.api';

const MAX_VISIBLE_TRANSACTIONS = 3;

export const useTransactionsList = () => {
  const { data: userIdObject, isLoading: isGetUserIdLoading } =
    useGetUserIdQuery();

  const {
    data: transactions,
    isLoading: isTransactionsListLoading,
    isError: isTransactionsListError,
  } = useGetTransactionsByUserIdQuery(
    {
      userId: Number(userIdObject?.userId),
      page: 1,
      count: 10,
    },
    { skip: !userIdObject?.userId },
  );

  const transactionsSorted = [...(transactions?.data || [])].sort((a, b) => {
    const timeA = new Date(a.dateTime).getTime();
    const timeB = new Date(b.dateTime).getTime();
    return timeB - timeA;
  });

  const all = transactionsSorted.slice(0, MAX_VISIBLE_TRANSACTIONS);

  const income = transactionsSorted.filter(
    (transaction) => transaction.type === 'INCOME',
  );

  const expenses = transactionsSorted.filter(
    (transaction) => transaction.type === 'EXPENSE',
  );

  return {
    transactions: { all, income, expenses },
    isTransactionsListLoading,
    isTransactionsListError,
  };
};
