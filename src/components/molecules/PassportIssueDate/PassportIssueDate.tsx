import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useTranslation } from 'react-i18next';

import {
  StyledDatePicker,
  StyledTextButtons,
} from './PassportIssueDate.styled';

dayjs.extend(updateLocale);
const today = dayjs();
const maxDate = today.subtract(1, 'day');
dayjs.updateLocale('en', {
  weekStart: 1,
});

export const PassportIssueDate = () => {
  const { t } = useTranslation('translation');
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDatePicker
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
  );
};
