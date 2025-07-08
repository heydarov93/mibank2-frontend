import { render, screen } from '@testing-library/react';

import { Transaction, ITransaction } from './Transaction';

jest.mock('utils', () => ({
  formatLocaleTimeString: jest.fn((date: string) => `Formatted: ${date}`),
}));

jest.mock('../../atoms/TransactionIcon/TransactionIcon', () => ({
  TransactionIcon: ({ type }: { type: string }) => (
    <div data-testid="transaction-icon" data-type={type}>
      {type} icon
    </div>
  ),
}));

jest.mock('./Transaction.styled', () => ({
  StyledContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="transaction-container">{children}</div>
  ),
  StyledTopRow: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="top-row">{children}</div>
  ),
  StyledBtmRow: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="bottom-row">{children}</div>
  ),
  StyledTypography: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="typography">{children}</span>
  ),
}));

const mockIncomeTransaction: ITransaction = {
  cardName: 'Visa Card',
  cardNumber: '1234567890123456',
  amount: '150.00',
  currency: 'USD',
  date: '2024-01-15T10:30:00Z',
  type: 'income',
};

const mockExpenseTransaction: ITransaction = {
  cardName: 'MasterCard',
  cardNumber: '9876543210987654',
  amount: '75.50',
  currency: 'EUR',
  date: '2024-01-16T14:45:00Z',
  type: 'expense',
};

const renderTransaction = (data: ITransaction) => {
  return render(<Transaction data={data} />);
};

describe('Transaction Component', () => {
  describe('Rendering', () => {
    it('renders all transaction elements', () => {
      renderTransaction(mockIncomeTransaction);
      
      expect(screen.getByTestId('transaction-container')).toBeInTheDocument();
      expect(screen.getByTestId('transaction-icon')).toBeInTheDocument();
      expect(screen.getByTestId('top-row')).toBeInTheDocument();
      expect(screen.getByTestId('bottom-row')).toBeInTheDocument();
      expect(screen.getAllByTestId('typography')).toHaveLength(4);
    });

    it('displays transaction icon with correct type', () => {
      renderTransaction(mockIncomeTransaction);
      
      const icon = screen.getByTestId('transaction-icon');
      expect(icon).toHaveAttribute('data-type', 'income');
    });

    it('displays card name', () => {
      renderTransaction(mockIncomeTransaction);
      
      expect(screen.getByText('Visa Card')).toBeInTheDocument();
    });

  });

  describe('Amount Display', () => {
    it('displays income amount with plus sign', () => {
      renderTransaction(mockIncomeTransaction);
      
      expect(screen.getByText('+ USD 150.00')).toBeInTheDocument();
    });

    it('displays expense amount with minus sign', () => {
      renderTransaction(mockExpenseTransaction);
      
      expect(screen.getByText('- EUR 75.50')).toBeInTheDocument();
    });
  });

  describe('Card Number Display', () => {
    it('displays masked card number with last 4 digits', () => {
      renderTransaction(mockIncomeTransaction);
      
      expect(screen.getByText('**** 3456')).toBeInTheDocument();
    });

    it('handles different card number lengths', () => {
      const shortCardTransaction = {
        ...mockIncomeTransaction,
        cardNumber: '1234',
      };
      
      renderTransaction(shortCardTransaction);
      
      expect(screen.getByText('**** 1234')).toBeInTheDocument();
    });
  });

  describe('Transaction Types', () => {
    it('renders income transaction correctly', () => {
      renderTransaction(mockIncomeTransaction);
      
      expect(screen.getByTestId('transaction-icon')).toHaveAttribute('data-type', 'income');
      expect(screen.getByText('+ USD 150.00')).toBeInTheDocument();
    });

    it('renders expense transaction correctly', () => {
      renderTransaction(mockExpenseTransaction);
      
      expect(screen.getByTestId('transaction-icon')).toHaveAttribute('data-type', 'expense');
      expect(screen.getByText('- EUR 75.50')).toBeInTheDocument();
    });
  });
});