import { ITransaction } from 'models/ITransactionInfo';

const MAX_VISIBLE_TRANSACTIONS = 3;

export const useMockTransactions = () => {
  // TODO: replace with actual data
  const transactions: ITransaction[] = [
    {
      cardName: 'Strong card',
      cardNumber: '4256365874523649',
      amount: '241.5',
      currency: 'PLN',
      date: '2025-03-26 16:52:00',
      type: 'income',
    },
    {
      cardName: 'Strong card',
      cardNumber: '4256365874528967',
      amount: '135.0',
      currency: 'PLN',
      date: '2025-02-14 11:42:00',
      type: 'income',
    },
    {
      cardName: 'Strong card',
      cardNumber: '4256365874524125',
      amount: '44.5',
      currency: 'PLN',
      date: '2025-03-27 12:21:00',
      type: 'income',
    },
    {
      cardName: 'Strong card',
      cardNumber: '4256365874523649',
      amount: '4.20',
      currency: 'PLN',
      date: '2025-06-04 15:21:00',
      type: 'expense',
    },
    {
      cardName: 'Strong card',
      cardNumber: '4256365874528967',
      amount: '12.60',
      currency: 'PLN',
      date: '2025-03-27 12:14:00',
      type: 'expense',
    },
    {
      cardName: 'Strong card',
      cardNumber: '4256365874524125',
      amount: '24.50',
      currency: 'PLN',
      date: '2025-03-27 09:26:00',
      type: 'expense',
    },
  ];

  const transactionsSorted = [...transactions].sort((a, b) => {
    const timeA = new Date(a.date).getTime();
    const timeB = new Date(b.date).getTime();
    return timeB - timeA;
  });

  const all = transactionsSorted.slice(0, MAX_VISIBLE_TRANSACTIONS);

  const income = transactionsSorted.filter(
    (transaction) => transaction.type === 'income',
  );

  const expenses = transactionsSorted.filter(
    (transaction) => transaction.type === 'expense',
  );

  const isLoading = false;
  const isError = false;

  return {
    transactions: {
      all,
      income,
      expenses,
    },
    isLoading,
    isError,
  };
};
