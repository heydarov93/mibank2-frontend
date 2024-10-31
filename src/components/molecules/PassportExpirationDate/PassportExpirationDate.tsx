import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useTranslation } from 'react-i18next';

import {
  StyledDatePicker,
  StyledTextButtons,
} from './PassportExpirationDate.styled';

dayjs.extend(updateLocale);
const today = dayjs();
const minDate = today.add(1, 'year');
dayjs.updateLocale('en', {
  weekStart: 1,
});

export const PassportExpirationDate = () => {
  const { t } = useTranslation('translation');
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
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
  );
};
