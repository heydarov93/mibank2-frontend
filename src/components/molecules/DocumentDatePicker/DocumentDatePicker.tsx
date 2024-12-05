import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldErrors,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledDatePicker,
  StyledTextButtons,
} from './DocumentDatePicker.styled';

import { IDocumentInfo } from 'models/IRegistration';

dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
  weekStart: 1,
});

interface PassportExpFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  minDate: Dayjs;
  maxDate: Dayjs;
  placeholder: string;
  errors: FieldErrors<IDocumentInfo>;
  className?: string;
}

export const DocumentDatePicker = <T extends FieldValues>({
  name,
  control,
  minDate,
  maxDate,
  placeholder,
}: PassportExpFieldProps<T>) => {
  const { t } = useTranslation('translation');
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StyledDatePicker
            {...field}
            value={field.value ? dayjs(field.value) : null}
            minDate={minDate}
            maxDate={maxDate}
            dayOfWeekFormatter={(weekday) => `${weekday.format('ddd')}`}
            showDaysOutsideCurrentMonth
            format="DD/MM/YYYY"
            slots={{
              openPickerIcon: CalendarTodayOutlinedIcon,
              actionBar: StyledTextButtons,
            }}
            slotProps={{
              popper: {
                placement: 'top-end',
              },
              actionBar: {
                actions: ['cancel', 'accept'],
              },
              textField: {
                name,
                id: name,
                placeholder: t(`${placeholder}`),
                onKeyDown: (e) => {
                  e.preventDefault();
                },
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
