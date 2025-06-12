import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';

import { RatesTable } from './RatesTable';

import {
  useGetCurrentRatesQuery,
  useGetPreviousRatesQuery,
} from 'api/getExchangeRatesApi';
import { theme } from 'theme/theme';

jest.mock('api/getExchangeRatesApi', () => ({
  useGetCurrentRatesQuery: jest.fn(),
  useGetPreviousRatesQuery: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

describe('RatesTable component', () => {
  const mockCurrentRates = [
    {
      rates: [
        { currency: 'US Dollar', code: 'USD', bid: 1.0, ask: 1.1 },
        { currency: 'Euro', code: 'EUR', bid: 0.9, ask: 1.0 },
      ],
    },
  ];

  const mockPreviousRates = [
    {
      rates: [
        { currency: 'US Dollar', code: 'USD', bid: 0.95, ask: 1.05 },
        { currency: 'Euro', code: 'EUR', bid: 0.91, ask: 0.99 },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('matches snapshot', () => {
    (useGetCurrentRatesQuery as jest.Mock).mockReturnValue({
      data: [
        {
          rates: [
            { currency: 'US Dollar', code: 'USD', bid: 1.0, ask: 1.1 },
            { currency: 'Euro', code: 'EUR', bid: 0.9, ask: 1.0 },
          ],
        },
      ],
      isLoading: false,
      isError: false,
    });

    (useGetPreviousRatesQuery as jest.Mock).mockReturnValue({
      data: [
        {
          rates: [
            { currency: 'US Dollar', code: 'USD', bid: 0.95, ask: 1.05 },
            { currency: 'Euro', code: 'EUR', bid: 0.91, ask: 0.99 },
          ],
        },
      ],
      isLoading: false,
      isError: false,
    });

    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <RatesTable />
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('renders loading spinner if data is loading', () => {
    (useGetCurrentRatesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    (useGetPreviousRatesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <ThemeProvider theme={theme}>
        <RatesTable />
      </ThemeProvider>,
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders error fallback if API errors occur', () => {
    (useGetCurrentRatesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });
    (useGetPreviousRatesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(
      <ThemeProvider theme={theme}>
        <RatesTable />
      </ThemeProvider>,
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  test('renders table with rate rows and trend icons', () => {
    (useGetCurrentRatesQuery as jest.Mock).mockReturnValue({
      data: mockCurrentRates,
      isLoading: false,
      isError: false,
    });
    (useGetPreviousRatesQuery as jest.Mock).mockReturnValue({
      data: mockPreviousRates,
      isLoading: false,
      isError: false,
    });

    render(
      <ThemeProvider theme={theme}>
        <RatesTable />
      </ThemeProvider>,
    );

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('currencyColumnLabel')).toBeInTheDocument();
    expect(screen.getByText('buyRateColumnLabel')).toBeInTheDocument();
    expect(screen.getByText('sellRateColumnLabel')).toBeInTheDocument();

    expect(screen.getByText('1 USD')).toBeInTheDocument();
    expect(screen.getByText('1 EUR')).toBeInTheDocument();

    expect(screen.getByTestId('bid-USD')).toHaveTextContent('1');
    expect(screen.getByTestId('ask-USD')).toHaveTextContent('1.1');
    expect(screen.getByTestId('bid-EUR')).toHaveTextContent('0.9');
    expect(screen.getByTestId('ask-EUR')).toHaveTextContent('1');

    expect(screen.getAllByTestId('TrendingUpIcon').length).toBeGreaterThan(0);
    expect(screen.getAllByTestId('TrendingDownIcon').length).toBeGreaterThan(0);
  });
});
