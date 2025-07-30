import { TransfersDateRangePicker } from '../molecules';

import { SelectFieldOption } from 'components/molecules';
import { t } from 'config';
import { ETransactionType } from 'enums/ETransactionType';
import { ETransferTime } from 'enums/ETransferTime';

const path = 'Transfers.filters.options';

export const filterOptions = {
  time: [
    {
      label: t(`${path}.time.last7Days`),
      value: ETransferTime.LAST_7_DAYS,
    },
    {
      label: t(`${path}.time.last30Days`),
      value: ETransferTime.LAST_30_DAYS,
    },
    {
      label: t(`${path}.time.allTime`),
      value: ETransferTime.ALL_TIME,
    },
    {
      label: t(`${path}.time.custom`),
      value: ETransferTime.CUSTOM,
      preventClosing: true,
      renderMenuExtender: ({ onClose }) => (
        <TransfersDateRangePicker onClose={onClose} />
      ),
    },
  ],
  transactionTypes: [
    {
      label: t(`${path}.transactionTypes.all`),
      value: ETransactionType.ALL,
    },
    {
      label: t(`${path}.transactionTypes.income`),
      value: ETransactionType.INCOME,
    },
    {
      label: t(`${path}.transactionTypes.expense`),
      value: ETransactionType.EXPENSE,
    },
  ],
} satisfies Record<string, SelectFieldOption[]>;
