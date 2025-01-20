import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
  id: string;
  control: Control<T>;
  minDate?: Dayjs;
  maxDate: Dayjs;
  placeholder: string;
  errors: FieldErrors<IDocumentInfo>;
  className?: string;
}

export const DocumentDatePicker = <T extends FieldValues>({
  name,
  control,
  id,
  minDate,
  maxDate,
  placeholder,
}: PassportExpFieldProps<T>) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(500));
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
                modifiers: [
                  {
                    name: 'preventOverflow',
                    enabled: true,
                    options: {
                      altAxis: true,
                      altBoundary: true,
                      tether: true,
                      rootBoundary: 'document',
                      padding: 8,
                    },
                  },
                ],
              },
              actionBar: {
                actions: ['cancel', 'accept'],
              },
              textField: {
                name,
                id: id,
                placeholder: t(`${placeholder}`),
                inputProps: {
                  disabled: isMobile ? false : true,
                },
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
