import CloseIcon from '@mui/icons-material/Close';
import {
  Button,
  SelectChangeEvent,
  Stack,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useTransferFilters } from '../../hooks/useTransferFilters';

import { StyledSelectField } from './TransferFilters.styled';

import { DATE_FORMATS } from 'constants/business/date';
import { DATE_SELECT_MENU_SIZE } from 'constants/ui/layout';
import { ETransferTime } from 'enums/ETransferTime';
import { formatDateByPattern } from 'utils/formatters';
import { TTransactionFiltersValues } from 'validation/transaction/transactionFilters.schema';

interface TransferFiltersProps {
  sx?: SxProps<Theme>;
}

export const TransferFilters = ({ sx }: TransferFiltersProps) => {
  const { availableFilters, defaultFilters } = useTransferFilters();
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
  }

  function handleDateChange(e: SelectChangeEvent<string | string[]>) {
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
  }

  return (
    <Stack sx={sx}>
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
              onChange={handleDateChange}
              data-testid="time-filter"
            />
            <StyledSelectField
              name="card"
              control={control}
              optionType="checkbox"
              options={availableFilters.card}
              containerSx={{ width: '235px' }}
              data-testid="card-filter"
            />
            <StyledSelectField
              name="template"
              control={control}
              optionType="radio"
              options={availableFilters.template}
              containerSx={{ width: '185px' }}
              data-testid="template-filter"
            />
            <StyledSelectField
              name="transactionsType"
              control={control}
              optionType="checkbox"
              options={availableFilters.transactionsType}
              containerSx={{ width: '170px' }}
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
