import dayjs from 'dayjs';

import { SelectFieldOption } from 'components/molecules';
import { filterOptions } from 'components/organisms/TransactionsTable/constants/transactionFilterOptions';
import { ETransactionType } from 'enums/ETransactionType';
import { ETransferTime } from 'enums/ETransferTime';
import { TTransactionFiltersValues } from 'validation/transaction/transactionFilters.schema';

type AvailableFilters = Record<
  keyof Pick<
    TTransactionFiltersValues,
    'card' | 'template' | 'time' | 'transactionsType'
  >,
  SelectFieldOption[]
>;

export const useTransferFilters = () => {
  // TODO replace mock data with api calls when it is ready

  const cardOptions: SelectFieldOption[] = [
    {
      value: 'All cards',
      preventClosing: true,
    },
    {
      value: 'Strong Card **** 5678',
      preventClosing: true,
    },
    {
      value: 'Strong Card **** 1234',
      preventClosing: true,
    },
  ];

  const templateOptions: SelectFieldOption[] = [
    { value: 'All templates' },
    { value: 'Template 1' },
    { value: 'Template 2' },
    { value: 'Template 3' },
    { value: 'Template 4' },
  ];

  const availableFilters: AvailableFilters = {
    card: cardOptions,
    template: templateOptions,
    time: filterOptions.time,
    transactionsType: filterOptions.transactionTypes,
  };

  const defaultFilters: TTransactionFiltersValues = {
    time: ETransferTime.LAST_7_DAYS,
    card: [availableFilters.card[0].value],
    template: availableFilters.template[0].value,
    transactionsType: [ETransactionType.ALL],
    startDate: dayjs().subtract(7, 'day').toDate(),
    endDate: new Date(),
  };

  return {
    availableFilters,
    defaultFilters,
    isLoading: false,
    isError: false,
    error: null,
  };
};
