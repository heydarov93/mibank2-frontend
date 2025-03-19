import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useTranslation } from 'react-i18next';

import CurrencyCalculator from './CurrencyCalculator';

import { useGetExchangeRatesQuery } from 'api/getExchangeRatesApi';

jest.mock('api/getExchangeRatesApi', () => ({
  useGetExchangeRatesQuery: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
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

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key,
    });

    (useGetExchangeRatesQuery as jest.Mock).mockReturnValue({
      data: [{ rates: mockRates }],
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('CurrencyCalculator snapshot', () => {
    const { container } = render(<CurrencyCalculator />);
    expect(container).toMatchSnapshot();
  });

  test('renders correctly', () => {
    render(<CurrencyCalculator />);
    expect(screen.getByText('CurCal.cal')).toBeInTheDocument();
  });

  test('handles amount change for "from" currency', async () => {
    render(<CurrencyCalculator />);

    const fromAmount = screen.getAllByRole('textbox')[0];
    fireEvent.change(fromAmount, { target: { value: '100' } });

    await waitFor(() =>
      expect((fromAmount as HTMLInputElement).value).toBe('100'),
    );

    const toAmount = screen.getAllByRole('textbox')[1];
    expect(toAmount).toHaveValue('116.28');
  });

  test('handles amount change for "to" currency', async () => {
    render(<CurrencyCalculator />);

    const toAmount = screen.getAllByRole('textbox')[1];
    fireEvent.change(toAmount, { target: { value: '100' } });

    await waitFor(() =>
      expect((toAmount as HTMLInputElement).value).toBe('100'),
    );

    const fromAmount = screen.getAllByRole('textbox')[0];
    expect(fromAmount).toHaveValue('86.00');
  });

  test('displays loading spinner', async () => {
    (useGetExchangeRatesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<CurrencyCalculator />);
    await waitFor(() => {
      expect(screen.getByText('Reload.svg')).toBeInTheDocument();
    });
  });

  test('displays error message when API call fails', async () => {
    (useGetExchangeRatesQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(<CurrencyCalculator />);

    await waitFor(() =>
      expect(screen.getByText('CurCal.error')).toBeInTheDocument(),
    );
  });

  test('validates input format', async () => {
    render(<CurrencyCalculator />);

    const fromAmount = screen.getAllByRole('textbox')[0];
    fireEvent.change(fromAmount, { target: { value: '123,456,789' } });

    await waitFor(() =>
      expect((fromAmount as HTMLInputElement).value).toBe('123456,789'),
    );
  });

  test('displays calculated exchange rate', async () => {
    render(<CurrencyCalculator />);

    const rate = await screen.findByText('CurCal.rate: 1 USD = 1.1628 EUR');
    expect(rate).toBeInTheDocument();
  });
});
