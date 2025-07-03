import { Button, Stack, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DateObject } from 'react-multi-date-picker';

import { StyledInputField } from './TransferDateRangePicker.styled';

import { FieldWithLabel } from 'components/atoms';
import { DateCalendar } from 'components/molecules';
import { formatDate } from 'utils/formatDate';
import { TTransactionFiltersValues } from 'validation/transaction/transactionFilters.schema';

interface TransfersDateRangePickerProps {
  onClose: () => void;
}

export const TransfersDateRangePicker = ({
  onClose,
}: TransfersDateRangePickerProps) => {
  const theme = useTheme();
  const { t } = useTranslation('translation', {
    keyPrefix: 'Transfers.datePicker',
  });
  // TODO get from backend
  const firstTransactionDate = new DateObject().subtract(3, 'month');
  const { control, setValue } = useFormContext<TTransactionFiltersValues>();
  const dateValues = useWatch({
    control,
    name: ['startDate', 'endDate'],
  }) as [Date, Date];
  const [startDate, endDate] = dateValues;
  const [isSettingStartDate, setIsSettingStartDate] = useState(true);
  const previousSavedDatesRef = useRef(dateValues);
  const minDate = isSettingStartDate ? firstTransactionDate : startDate;
  const maxDate = isSettingStartDate ? endDate : new Date();

  function setValues([startDate, endDate]: DateObject[]) {
    if (startDate && endDate) {
      setValue('startDate', startDate.toDate());
      setValue('endDate', endDate.toDate());
    }
  }

  function handleCancel() {
    const [startDate, endDate] = previousSavedDatesRef.current;
    setTimeout(() => {
      setValue('startDate', startDate);
      setValue('endDate', endDate);
    }, 300);
    onClose();
  }

  function handleApply() {
    previousSavedDatesRef.current = [startDate, endDate];
    onClose();
  }

  function handleDateSelection(selectedDate?: DateObject) {
    if (!selectedDate) {
      if (isSettingStartDate) {
        setValue('startDate', endDate);
        setIsSettingStartDate(false);
      } else {
        setValue('endDate', startDate);
        setIsSettingStartDate(true);
      }
    } else {
      if (isSettingStartDate) {
        setValue('startDate', selectedDate.toDate());
        setIsSettingStartDate(false);
      } else {
        setValue('endDate', selectedDate.toDate());
        setIsSettingStartDate(true);
      }
    }
  }

  return (
    <Stack
      sx={{
        width: '638px',
        height: `calc(100% - ${theme.spacing(4)})`,
        padding: theme.spacing(2),
        boxSizing: 'content-box',
        gap: 2,
        borderLeft: `1px solid ${theme.palette.bg.lightBlue}`,
      }}
      data-testid="transfers-date-range-picker"
    >
      <Stack direction="row" gap={2}>
        <FieldWithLabel label={t('startDate')} sx={{ flex: 1 }}>
          <StyledInputField
            name="startDate"
            control={control}
            id="startDate"
            value={formatDate(startDate)}
            active={isSettingStartDate}
            onClick={() => setIsSettingStartDate(true)}
            data-testid="start-date"
          />
        </FieldWithLabel>
        <FieldWithLabel label={t('endDate')} sx={{ flex: 1 }}>
          <StyledInputField
            name="endDate"
            control={control}
            id="endDate"
            value={formatDate(endDate)}
            active={!isSettingStartDate}
            onClick={() => setIsSettingStartDate(false)}
            data-testid="end-date"
          />
        </FieldWithLabel>
      </Stack>
      <DateCalendar
        onFocusedDateChange={handleDateSelection}
        numberOfMonths={2}
        value={dateValues}
        onChange={setValues}
        minDate={minDate}
        maxDate={maxDate}
        currentDate={new DateObject().subtract(1, 'month')}
        mapDays={({ date }) => {
          const itemDate = date.toDate();

          if (dayjs(itemDate).isBetween(startDate, endDate, 'day')) {
            return { className: 'rmdp-day rmdp-range' };
          }

          if (dayjs(itemDate).isSame(startDate, 'day')) {
            return {
              className: 'rmdp-day rmdp-range start',
              'data-testid': 'selected-start-date',
            };
          }

          if (dayjs(itemDate).isSame(endDate, 'day')) {
            return {
              className: 'rmdp-day rmdp-range end',
              'data-testid': 'selected-end-date',
            };
          }
        }}
      />
      <Stack
        direction="row"
        minHeight="44px"
        width="280px"
        gap={1}
        justifyContent="space-between"
        alignSelf="flex-end"
        mt="auto"
      >
        <Button
          variant="outlined"
          sx={{ flex: 1 }}
          onClick={handleCancel}
          data-testid="cancel-btn"
        >
          {t('cancel')}
        </Button>
        <Button variant="contained" sx={{ flex: 1 }} onClick={handleApply}>
          {t('apply')}
        </Button>
      </Stack>
    </Stack>
  );
};
