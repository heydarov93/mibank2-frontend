import dayjs from 'dayjs';

import { SelectFieldOption } from 'components/molecules';
import { filterOptions } from 'components/organisms/TransactionsTable/constants/transactionFilterOptions';
import { CARD_OPTIONS, TEMPLATE_OPTIONS } from 'constants/business/transaction';
import { ETransactionType } from 'enums/ETransactionType';
import { ETransferTime } from 'enums/ETransferTime';
import { TTransactionFiltersValues } from 'validation/transaction/transactionFilters.schema';

export type AvailableFilters = Record<
  keyof Pick<
    TTransactionFiltersValues,
    'card' | 'template' | 'time' | 'transactionsType'
  >,
  SelectFieldOption[]
>;

export const useTransferFilters = () => {
  // TODO replace mock data with api calls when it is ready

  const availableFilters: AvailableFilters = {
    card: CARD_OPTIONS,
    template: TEMPLATE_OPTIONS,
    time: filterOptions.time,
    transactionsType: filterOptions.transactionTypes,
  };

  const defaultFilters: TTransactionFiltersValues = {
    time: ETransferTime.LAST_7_DAYS,
    card: [availableFilters.card[0].value],
    template: [availableFilters.template[0].value],
    transactionsType: ETransactionType.ALL,
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
