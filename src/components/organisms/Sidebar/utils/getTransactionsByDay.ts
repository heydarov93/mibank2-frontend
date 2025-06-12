import { ITransaction } from '../molecules/Transaction/Transaction';

import { getLocaleDateString } from 'utils/dateUtils';

export function getTransactionsByDay(transactions: ITransaction[]) {
  const uniqueDays = Array.from(
    new Set(
      transactions.map((transaction) => getLocaleDateString(transaction.date)),
    ),
  );

  return uniqueDays.map((day) => ({
    date: day,
    transactions: transactions.filter(
      (transaction) => getLocaleDateString(transaction.date) === day,
    ),
  }));
}
