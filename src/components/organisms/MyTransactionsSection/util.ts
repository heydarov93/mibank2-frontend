import { IGetTransactionsList } from 'api/services/account-service/types/transactions.types';
import { IDisplayTransaction } from 'models/ITransaction';
import { TCurrency } from 'types/types';
import { formatLocaleTimeString } from 'utils';

export const getDisplayTransactionData = (
  transactionsList: IGetTransactionsList[],
): IDisplayTransaction[] => {
  return transactionsList.map((tx) => {
    const isCard = tx.transferType === 'CARD';
    return {
      cardName: isCard ? tx.source.split('_')[0] : '',
      cardNumber: tx.transferType === 'CARD' ? tx.source.split('_')[1] : tx.source,
      amount: tx.totalAmount.toString(),
      currency: tx.currencyCode as TCurrency,
      date: formatLocaleTimeString(tx.dateTime),
      type: tx.type === 'INCOME' ? 'income' : 'expense',
    };
  });
};
