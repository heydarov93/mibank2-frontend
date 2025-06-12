import { render, screen } from '@testing-library/react';

import { Transaction, ITransaction } from './Transaction';

jest.mock('utils/dateUtils', () => ({
  getLocaleDateString: () => 'MOCKED_DATE',
  getLocaleTimeString: () => 'MOCKED_TIME',
}));

describe('Transaction', () => {
  const baseTransaction: ITransaction = {
    cardName: 'My Visa',
    cardNumber: '1234567890123456',
    amount: '100.00',
    currency: 'USD',
    date: '2024-06-09T12:34:56Z',
    type: 'income',
  };

  it('renders transaction data correctly for income', () => {
    render(<Transaction data={baseTransaction} />);

    expect(screen.getByText('My Visa')).toBeInTheDocument();
    expect(screen.getByText('+ USD 100.00')).toBeInTheDocument();

    expect(screen.getByText(/3456/)).toBeInTheDocument();
    expect(screen.getByText('MOCKED_TIME')).toBeInTheDocument();
  });

  it('renders transaction data correctly for expense', () => {
    const expenseTransaction = { ...baseTransaction, type: 'expense' as const };

    render(<Transaction data={expenseTransaction} />);

    expect(screen.getByText('- USD 100.00')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Transaction data={baseTransaction} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
