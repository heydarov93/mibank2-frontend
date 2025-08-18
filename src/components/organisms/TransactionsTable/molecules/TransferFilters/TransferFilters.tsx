import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme, useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AvailableFilters } from '../../hooks/useTransferFilters';

import { StyledSelectField } from './TransferFilters.styled';

import { DATE_FORMATS } from 'constants/business/date';
import { DATE_SELECT_MENU_SIZE } from 'constants/ui/layout';
import { ETransferTime } from 'enums/ETransferTime';
import { formatDateByPattern } from 'utils/formatters';
import { TTransactionFiltersValues } from 'validation/transaction/transactionFilters.schema';

interface TransferFiltersProps {
  sx?: SxProps<Theme>;
  availableFilters: AvailableFilters;
  defaultFilters: TTransactionFiltersValues;
  handleFiltersChange: (currentFIlters: TTransactionFiltersValues) => void;
}

export const TransferFilters = ({
  sx,
  availableFilters,
  defaultFilters,
  handleFiltersChange,
}: TransferFiltersProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Transfers.filters',
  });
  const theme = useTheme();
  // TODO get from backend
  const firstTransactionDate = dayjs().subtract(3, 'month');
  const formMethods = useForm<TTransactionFiltersValues>({
    defaultValues: defaultFilters,
  });
  const {
    control,
    formState: { isDirty },
    setValue,
    reset,
  } = formMethods;
  const [timeSelectValue, startDate, endDate] = useWatch({
    control,
    name: ['time', 'startDate', 'endDate'],
  });

  function clearFilters() {
    reset();
    handleFiltersChange(formMethods.getValues());
  }

  function handleFilterInputsChange(e: SelectChangeEvent<string | string[]>) {
    const { value } = e.target;

    switch (value) {
      case ETransferTime.LAST_7_DAYS:
        setValue('startDate', dayjs().subtract(7, 'days').toDate());
        setValue('endDate', new Date());
        break;
      case ETransferTime.LAST_30_DAYS:
        setValue('startDate', dayjs().subtract(30, 'days').toDate());
        setValue('endDate', new Date());
        break;
      case ETransferTime.ALL_TIME:
        setValue('startDate', firstTransactionDate.toDate());
        setValue('endDate', new Date());
        break;
    }
    handleFiltersChange(formMethods.getValues());
  }

  return (
    <Stack sx={sx} data-testid="transfer-filter">
      <Stack direction="row" justifyContent="space-between" gap={1}>
        <Stack direction="row" gap={2} height="48px">
          <FormProvider {...formMethods}>
            <StyledSelectField
              name="time"
              control={control}
              options={availableFilters.time}
              containerSx={{ width: '156px' }}
              menuSx={
                timeSelectValue === ETransferTime.CUSTOM
                  ? DATE_SELECT_MENU_SIZE
                  : undefined
              }
              optionType="radio"
              onChange={handleFilterInputsChange}
              data-testid="time-filter"
            />
            <StyledSelectField
              name="card"
              control={control}
              optionType="checkbox"
              options={availableFilters.card}
              containerSx={{ width: '235px' }}
              onChange={handleFilterInputsChange}
              data-testid="card-filter"
            />
            <StyledSelectField
              name="template"
              control={control}
              optionType="checkbox"
              options={availableFilters.template}
              containerSx={{ width: '185px' }}
              onChange={() => {
                'use strict';
              }}
              data-testid="template-filter"
            />
            <StyledSelectField
              name="transactionsType"
              control={control}
              optionType="radio"
              options={availableFilters.transactionsType}
              containerSx={{ width: '170px' }}
              onChange={handleFilterInputsChange}
              data-testid="transactions-type-filter"
            />
          </FormProvider>
        </Stack>
        <Button
          variant="text"
          disabled={!isDirty}
          sx={{ color: theme.palette.common.black }}
          onClick={clearFilters}
          data-testid="clear-filters-button"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <CloseIcon />
            <Typography fontSize={14}>{t('clearFilters')}</Typography>
          </Stack>
        </Button>
      </Stack>
      <Typography mt={2} color="grey.400" fontWeight={500}>
        {t('periodInfo', {
          startDate: formatDateByPattern(startDate, DATE_FORMATS.DD_MM_YYYY),
          endDate: formatDateByPattern(endDate, DATE_FORMATS.DD_MM_YYYY),
        })}
      </Typography>
    </Stack>
  );
};
