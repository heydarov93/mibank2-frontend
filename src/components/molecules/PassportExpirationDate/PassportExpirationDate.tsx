import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
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
} from './PassportExpirationDate.styled';

import { IDocumentInfo } from 'models/IRegistration';

dayjs.extend(updateLocale);
const today = dayjs();
const minDate = today.add(1, 'year');
dayjs.updateLocale('en', {
  weekStart: 1,
});

interface PassportExpFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<IDocumentInfo>;
  className?: string;
}

export const PassportExpirationDate = <T extends FieldValues>({
  name,
  control,
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
            value={field.value ? field.value : null}
            minDate={minDate}
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
                name: 'passportExpirationDate',
                id: 'passportExpirationDate',
                placeholder: t('RegistrationPage.placeholder.dateOfBirth'),
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
