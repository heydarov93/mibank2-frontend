import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { act } from 'react-dom/test-utils';
import { FormProvider, useForm } from 'react-hook-form';

import { TransfersDateRangePicker } from './TransfersDateRangePicker';

import { theme } from 'theme/theme';
import { formatDate } from 'utils/formatDate';

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

    expect(startDate.value).toBe(formatDate(defaultValues.startDate));
    expect(endDate.value).toBe(formatDate(defaultValues.endDate));
  });

  it('has default dates selected in the calendar', () => {
    screen.debug(undefined, 20000);
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
    act(() => fireEvent.click(firstDay));

    const secondDay = getAvailableDays().at(-1) as HTMLElement;
    act(() => fireEvent.click(secondDay));

    const { startDate, endDate } = getDateElements();

    expect(startDate.value).not.toBe(formatDate(defaultValues.startDate));
    expect(endDate.value).not.toBe(formatDate(defaultValues.endDate));
  });

  it('executes onClose callback when user clicks on "Cancel" button', () => {
    act(() => fireEvent.click(screen.getByTestId('cancel-btn')));
    expect(onClose).toHaveBeenCalled();
  });
});
