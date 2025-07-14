import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
  ShakeWrapper,
  StyledErrorText,
} from './DateOfBirthField.styled';

import { DATE_FORMATS, WEEK_START_DAY_INDEX } from 'constants/business/date';
import { IPersonalInfo } from 'models/IRegistration';

dayjs.extend(updateLocale);
const today = dayjs();
const minDate = today.subtract(16, 'year');
const maxAge = today.subtract(120, 'year');
dayjs.updateLocale('en', {
  weekStart: WEEK_START_DAY_INDEX,
});

interface DateOfBirthFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<IPersonalInfo>;
  className?: string;
}

export const DateOfBirthField = <T extends FieldValues>({
  name,
  control,
  errors,
  className,
}: DateOfBirthFieldProps<T>) => {
  const { t } = useTranslation('translation');
  const hasError = !!errors.dateOfBirth;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(500));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ShakeWrapper>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledDatePicker
              {...field}
              hasError={hasError}
              value={field.value ? dayjs(field.value) : null}
              maxDate={minDate}
              minDate={maxAge}
              dayOfWeekFormatter={(weekday) => `${weekday.format('ddd')}`}
              showDaysOutsideCurrentMonth
              format={DATE_FORMATS.DD_MM_YYYY}
              className={className}
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
                  id: 'dateOfBirth',
                  placeholder: t('RegistrationPage.placeholder.dateOfBirth'),
                  inputProps: {
                    disabled: isMobile ? false : true,
                  },
                },
              }}
            />
          </LocalizationProvider>
          <StyledErrorText>
            {errors.dateOfBirth && (
              <span className="errorText">{errors.dateOfBirth?.message}</span>
            )}
          </StyledErrorText>
        </ShakeWrapper>
      )}
    />
  );
};
