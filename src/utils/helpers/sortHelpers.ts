import { LOCALES } from 'constants/business/date';
import { SORT_ORDER } from 'constants/business/sortOrder';
import { IDisplayTransaction } from 'models/ITransaction';
import { TSortOrder } from 'types/types';
import { formatDateByLocale } from 'utils/formatters';

export const getNextSortOrder = (currentSort: TSortOrder) => {
  if (currentSort === SORT_ORDER.ASC) {
    return SORT_ORDER.DESC;
  } else if (currentSort === SORT_ORDER.DESC) {
    return '';
  } else {
    return SORT_ORDER.ASC;
  }
};

export function getTransactionsByDay(transactions: IDisplayTransaction[]) {
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
