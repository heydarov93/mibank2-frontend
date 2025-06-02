import { ThemeProvider } from '@mui/material';
import { Middleware, Reducer } from '@reduxjs/toolkit';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';

import CurrencyCalculator from './CurrencyCalculator';

import { useGetCurrentRatesQuery } from 'api/getExchangeRatesApi';
import store from 'store';
import { theme } from 'theme/theme';

const mockConvertCurrency = jest.fn();
type State = Record<string, unknown>;

jest.mock('api/getExchangeRatesApi', () => ({
  useGetCurrentRatesQuery: jest.fn(),
  getExchangeRatesApi: {
    reducerPath: 'getExchangeRatesApi',
    reducer: ((state: State = {}) => state) as Reducer<State>,
    middleware: (() => (next) => (action) => next(action)) as Middleware<
      object,
      State
    >,
  },
}));

jest.mock('api/convertCurrencyApi', () => ({
  useConvertCurrencyMutation: () => [
    mockConvertCurrency,
    { isLoading: false, isError: false },
  ],
  convertCurrencyApi: {
    reducerPath: 'convertCurrencyApi',
    reducer: ((state: State = {}) => state) as Reducer<State>,
    middleware: (() => (next) => (action) => next(action)) as Middleware<
      object,
      State
    >,
  },
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

describe('CurrencyCalculator', () => {
  const mockRates = [
    {
      code: 'USD',
      bid: 1.0,
      ask: 1.0,
    },
    {
      code: 'EUR',
      bid: 0.85,
      ask: 0.86,
    },
  ];

  let renderResult: ReturnType<typeof render>;

  const renderComponent = () =>
    render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CurrencyCalculator />
        </Provider>
      </ThemeProvider>,
    );

  beforeEach(() => {
    (useGetCurrentRatesQuery as jest.Mock).mockReturnValue({
      data: [{ rates: mockRates }],
      isLoading: false,
      error: null,
    });

    mockConvertCurrency.mockImplementation(() => ({
      unwrap: () => Promise.resolve({ convertedAmount: 116.28 }),
    }));

    renderResult = renderComponent();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('CurrencyCalculator snapshot', () => {
    const { container } = renderResult;
    expect(container).toMatchSnapshot();
  });

  test('renders correctly', () => {
    expect(screen.getByText('CurCal.cal')).toBeInTheDocument();
  });

  test('handles amount change for "from" currency', async () => {
    const fromAmount = screen.getAllByRole('textbox')[0];
    fireEvent.change(fromAmount, { target: { value: '100' } });

    await waitFor(() =>
      expect((fromAmount as HTMLInputElement).value).toBe('100'),
    );

    const toAmount = screen.getAllByRole('textbox')[1];
    await waitFor(() => expect(toAmount).toHaveValue('116.28'));
  });

  test('handles amount change for "to" currency', async () => {
    mockConvertCurrency.mockImplementation(() => ({
      unwrap: () => Promise.resolve({ convertedAmount: 86.0 }),
    }));
    renderResult = renderComponent();
    const toAmount = screen.getAllByRole('textbox')[1];
    fireEvent.change(toAmount, { target: { value: '100' } });

    await waitFor(() =>
      expect((toAmount as HTMLInputElement).value).toBe('100'),
    );

    const fromAmount = screen.getAllByRole('textbox')[0];
    await waitFor(() => expect(fromAmount).toHaveValue('86.00'));
  });

  test('displays loading spinner', async () => {
    (useGetCurrentRatesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: null,
    });

    renderResult = renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  test('displays error message when API call fails', async () => {
    (useGetCurrentRatesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    cleanup();
    renderResult = renderComponent();

    await waitFor(() => {
      expect(screen.getByTestId('error-message-box')).toBeInTheDocument();
    });
  });

  test('validates input format', async () => {
    const fromAmount = screen.getAllByRole('textbox')[0];
    fireEvent.change(fromAmount, { target: { value: '123456,789' } });

    await waitFor(() =>
      expect((fromAmount as HTMLInputElement).value).toBe('123456,789'),
    );
  });

  test('displays calculated exchange rate', async () => {
    const rate = await screen.findByText('CurCal.rate: 1 USD = 1.1628 EUR');
    expect(rate).toBeInTheDocument();
  });

  test('swaps currencies when swap button is clicked', async () => {
    const swapButton = screen.getByTestId('swap-button');
    fireEvent.click(swapButton);

    await waitFor(() => {
      expect(screen.getByDisplayValue('EUR')).toBeInTheDocument();
      expect(screen.getByDisplayValue('USD')).toBeInTheDocument();
    });
  });

  test('handles currency change and triggers conversion', async () => {
    const currencySelects = screen.getAllByRole('textbox');
    const fromCurrencySelect = currencySelects[0];
    fireEvent.change(fromCurrencySelect, { target: { value: 'EUR' } });

    await waitFor(() => {
      expect(mockConvertCurrency).toHaveBeenCalledWith({
        amount: expect.any(Number),
        fromCurrency: 'USD',
        toCurrency: 'EUR',
        fromAmountProvided: true,
      });
    });
  });

  test('does not display rate when currencies are not loaded', async () => {
    (useGetCurrentRatesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    cleanup();
    renderResult = renderComponent();

    expect(screen.queryByText(/CurCal.rate/)).not.toBeInTheDocument();
  });
});
