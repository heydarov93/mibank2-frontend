import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Transaction } from '../Transaction/Transaction';

import { ITransaction } from 'models/ITransactionInfo';
import { getTransactionsByDay } from 'utils/helpers';

const today = new Date().toLocaleDateString('pl-PL');

export function Transactions({ data }: { data: ITransaction[] }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar',
  });
  return (
    <Stack gap={2}>
      {getTransactionsByDay(data).map((day) => (
        <Stack key={day.date} gap={1}>
          <Typography fontSize={14} color="grey.400">
            {day.date === today ? t('myTransactions.today') : day.date}
          </Typography>
          {day.transactions.map((transaction) => (
            <Transaction key={transaction.date} data={transaction} />
          ))}
        </Stack>
      ))}
    </Stack>
  );
}
