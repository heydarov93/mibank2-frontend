import { ITransaction } from 'components/organisms/Sidebar/molecules/Transaction/Transaction';
import { LOCALES } from 'constants/date';
import { formatDateByLocale } from 'utils/formatters';

export const getNextSortOrder = (currentSort: string) => {
  if (currentSort === 'ASC') {
    return 'DESC';
  } else if (currentSort === 'DESC') {
    return '';
  } else {
    return 'ASC';
  }
};

export function getTransactionsByDay(transactions: ITransaction[]) {
  const uniqueDays = Array.from(
    new Set(
      transactions.map((transaction) =>
        formatDateByLocale(transaction.date, LOCALES.POLISH),
      ),
    ),
  );

  return uniqueDays.map((day) => ({
    date: day,
    transactions: transactions.filter(
      (transaction) =>
        formatDateByLocale(transaction.date, LOCALES.POLISH) === day,
    ),
  }));
}
