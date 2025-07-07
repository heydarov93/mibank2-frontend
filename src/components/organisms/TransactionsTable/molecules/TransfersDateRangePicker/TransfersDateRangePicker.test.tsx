import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { FormProvider, useForm } from 'react-hook-form';

import { TransfersDateRangePicker } from './TransfersDateRangePicker';

import { DATE_FORMATS } from 'constants/date';
import { theme } from 'theme/theme';
import { formatDateByPattern } from 'utils/formatters';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const onClose = jest.fn();

const endDateString = 'Tue Jun 10 2025';

const defaultValues = {
  startDate: dayjs(endDateString).subtract(1, 'week').toDate(),
  endDate: new Date(endDateString),
};

const getDateElements = () => {
  const startDate = screen
    .getByTestId('start-date')
    .querySelector('input') as HTMLInputElement;
  const endDate = screen
    .getByTestId('end-date')
    .querySelector('input') as HTMLInputElement;

  return { startDate, endDate };
};

const getAvailableDays = () => {
  const calendar = screen.getByRole('dialog');
  const availableDays = calendar.querySelectorAll('span.sd');

  return Array.from(availableDays);
};

const renderWithProviders = () => {
  const Wrapper = () => {
    const formMethods = useForm({ defaultValues });

    return (
      <ThemeProvider theme={theme}>
        <FormProvider {...formMethods}>
          <TransfersDateRangePicker onClose={onClose} />
        </FormProvider>
      </ThemeProvider>
    );
  };

  render(<Wrapper />);
};

describe('TransfersDateRangePicker', () => {
  beforeEach(() => {
    renderWithProviders();
  });

  it('renders default startDate and endDate', () => {
    const { startDate, endDate } = getDateElements();

    expect(startDate.value).toBe(formatDateByPattern(defaultValues.startDate, DATE_FORMATS.DD_MM_YYYY));
    expect(endDate.value).toBe(formatDateByPattern(defaultValues.endDate, DATE_FORMATS.DD_MM_YYYY));
  });

  it('has default dates selected in the calendar', () => {
    const selectedStartDate = screen.getByTestId('selected-start-date');
    const selectedEndDate = screen.getByTestId('selected-end-date');

    expect(selectedStartDate).toHaveTextContent(
      defaultValues.startDate.getDate().toString(),
    );

    expect(selectedEndDate).toHaveTextContent(
      defaultValues.endDate.getDate().toString(),
    );
  });

  it('changes startDate and endDate when custom range is selected', () => {
    const firstDay = getAvailableDays()[0];
    fireEvent.click(firstDay);

    const secondDay = getAvailableDays().at(-1) as HTMLElement;
    fireEvent.click(secondDay);

    const { startDate, endDate } = getDateElements();

    expect(startDate.value).not.toBe(formatDateByPattern(defaultValues.startDate, DATE_FORMATS.DD_MM_YYYY));
    expect(endDate.value).not.toBe(formatDateByPattern(defaultValues.endDate, DATE_FORMATS.DD_MM_YYYY));
  });

  it('executes onClose callback when user clicks on "Cancel" button', () => {
    fireEvent.click(screen.getByTestId('cancel-btn'));
    expect(onClose).toHaveBeenCalled();
  });
});
