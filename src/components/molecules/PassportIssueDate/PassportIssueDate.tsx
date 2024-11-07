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
} from './PassportIssueDate.styled';

import { IDocumentInfo } from 'models/IRegistration';

dayjs.extend(updateLocale);
const today = dayjs();
const maxDate = today.subtract(1, 'day');
dayjs.updateLocale('en', {
  weekStart: 1,
});

interface PassportIssueFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<IDocumentInfo>;
  className?: string;
}

export const PassportIssueDate = <T extends FieldValues>({
  name,
  control,
}: PassportIssueFieldProps<T>) => {
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
                name: 'passportIssueDate',
                id: 'passportIssueDate',
                placeholder: t(
                  'RegistrationPage.placeholder.placeholderDateOfBirth',
                ),
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
