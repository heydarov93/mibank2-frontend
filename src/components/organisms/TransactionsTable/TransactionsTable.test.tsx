jest.mock('./hooks/useTransactions', () => ({
  useTransactions: jest.fn(),
}));

import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dispatch, SetStateAction } from 'react';
import { Provider } from 'react-redux';

import { TransactionsTable } from './TransactionsTable';
import { TEmptyStateText, useTransactions } from './hooks/useTransactions';

import { IRawTransaction, ITransformedTransaction } from 'models/ITransaction';
import store from 'store';
import { theme } from 'theme/theme';
import { formatCardNumber, formatTransactionDate } from 'utils';
import { formatIbanNumber } from 'utils/formatters';

// TODO: test filter change affects when filter's functionality will be full ready

interface IUseTransactionsResult {
  transactionsList: IRawTransaction[];
  transactionsLength: number;
  emptyTransactionsTableText: TEmptyStateText | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  setDataSortOrder: Dispatch<SetStateAction<'ASC' | 'DESC'>>;
}

const mockTransactionsList: IRawTransaction[] = Array.from(
  { length: 15 },
  (_, i) => ({
    id: `3d9ea625-baa2-4521-8a5c-2c42990a55${i + 1}`,
    type: i % 2 === 0 ? 'INCOME' : 'EXPENSE',
    currencyCode: ['USD', 'EUR', 'GBP'][i % 3],
    totalAmount: Math.round(Math.random() * 1000 * (i + 1)),
    dateTime: new Date(Date.now() - i * 86400000).toISOString(),
    transferType: i % 2 === 0 ? 'CARD' : 'IBAN',
    source:
      i % 2 === 0
        ? `Strong_41694169416941${i.toString().padStart(2, '0')}`
        : `PL811232001453786892845062${i.toString().padStart(2, '0')}`,
  }),
);

const generateMockTransformedTransaction = (
  transaction: IRawTransaction,
): ITransformedTransaction => {
  const { date, time } = formatTransactionDate(transaction.dateTime);

  const transformedTransaction: ITransformedTransaction = {
    id: transaction.id,
    sourceNumber:
      transaction.transferType === 'CARD'
        ? formatCardNumber(transaction.source)
        : formatIbanNumber(transaction.source),
    amount: transaction.totalAmount,
    transferType: transaction.transferType === 'CARD' ? 'Card' : 'Account',
    isIncome: transaction.type === 'INCOME',
    template: 'Salary', //TODO: Placeholder for template, will be replaced with actual data
    date,
    time,
    currency: transaction.currencyCode,
  };

  return transformedTransaction;
};

const renderSingleTransaction = (transaction: IRawTransaction): void => {
  mockedUseTransactions.mockReturnValue({
    transactionsList: [transaction],
    transactionsLength: 1,
    emptyTransactionsTableText: undefined,
    setDataSortOrder: jest.fn(),
    isLoading: false,
    isError: false,
    isSuccess: true,
  });

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <TransactionsTable />
      </ThemeProvider>
    </Provider>,
  );
};

const mockedUseTransactions = useTransactions as jest.MockedFunction<
  () => IUseTransactionsResult
>;

describe('TransactionsTable', () => {
  describe('Table rendering with transactions data', () => {
    const transactions = mockTransactionsList.slice(0, 3);
    const mockedSetDataSortOrder = jest.fn();
    beforeEach(() => {
      mockedUseTransactions.mockReturnValue({
        transactionsList: transactions,
        transactionsLength: mockTransactionsList.length,
        emptyTransactionsTableText: undefined,
        setDataSortOrder: mockedSetDataSortOrder,
        isLoading: false,
        isError: false,
        isSuccess: true,
      });

      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <TransactionsTable />
          </ThemeProvider>
        </Provider>,
      );
    });

    it('renders the same number of rows as transactions provided', () => {
      expect(screen.getAllByTestId('table-row')).toHaveLength(
        transactions.length,
      );
    });

    it('displays correct column headers', () => {
      expect(screen.getAllByRole('columnheader')).toHaveLength(6);
      expect(screen.getByText('Source')).toBeInTheDocument();
      expect(screen.getByText('Transfer type')).toBeInTheDocument();
      expect(screen.getByText('Sum')).toBeInTheDocument();
      expect(screen.getByText('Template')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByTestId('table-sort-icon')).toBeInTheDocument();
    });

    it('renders main page title', () => {
      expect(screen.getByTestId('table-page-title')).toBeInTheDocument();
    });

    it("doesn't display empty state message", () => {
      expect(screen.queryAllByTestId(/table-empty/)).toHaveLength(0);
    });

    it('displays filters', () => {
      expect(screen.getByTestId('transfer-filter')).toBeInTheDocument();
    });

    it('displays pagination', () => {
      expect(screen.getByTestId('table-pagination')).toBeInTheDocument();
    });

    it('calls setDataSortOrder with a function when the sort icon button is clicked', async () => {
      const sortIconBtn = screen.getByTestId('table-sort-icon');
      await userEvent.click(sortIconBtn);

      expect(mockedSetDataSortOrder).toHaveBeenCalledTimes(1);
      expect(mockedSetDataSortOrder).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('Table rendering without transactions data', () => {
    beforeEach(() => {
      mockedUseTransactions.mockReturnValue({
        transactionsList: [],
        transactionsLength: 0,
        emptyTransactionsTableText: {
          title: 'No transactions',
          message: 'Make your first transaction',
        },
        setDataSortOrder: jest.fn(),
        isLoading: false,
        isError: false,
        isSuccess: true,
      });

      render(
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <TransactionsTable />
          </ThemeProvider>
        </Provider>,
      );
    });

    it('displays correct column headers', () => {
      expect(screen.getAllByRole('columnheader')).toHaveLength(6);
      expect(screen.getByText('Source')).toBeInTheDocument();
      expect(screen.getByText('Transfer type')).toBeInTheDocument();
      expect(screen.getByText('Sum')).toBeInTheDocument();
      expect(screen.getByText('Template')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByTestId('table-sort-icon')).toBeInTheDocument();
    });

    it("doesn't display any row", () => {
      expect(screen.queryByTestId('table-row')).toBeNull();
    });

    it('displays empty state message', () => {
      expect(screen.getByTestId('table-empty-title')).toHaveTextContent(
        'No transactions',
      );
      expect(screen.getByTestId('table-empty-message')).toHaveTextContent(
        'Make your first transaction',
      );
    });

    it('displays filters', () => {
      expect(screen.getByTestId('transfer-filter')).toBeInTheDocument();
    });

    it('displays pagination', () => {
      expect(screen.getByTestId('table-pagination')).toBeInTheDocument();
    });
  });

  describe('Table - single row interactions', () => {
    const mockTransaction: IRawTransaction = {
      id: '3d9ea625-baa2-4521-8a5c-2c42990a551',
      type: 'INCOME',
      currencyCode: 'USD',
      totalAmount: 1000,
      dateTime: '2024-06-01T12:00:00.000Z',
      transferType: 'CARD',
      source: 'Strong_4169416941694101',
    };

    beforeEach(() => {
      renderSingleTransaction(mockTransaction);
    });

    it('renders each field (column) from the provided transaction data', () => {
      const {
        sourceNumber,
        amount,
        transferType,
        template,
        date,
        time,
        currency,
      } = generateMockTransformedTransaction(mockTransaction);

      expect(screen.getByText(sourceNumber)).toBeInTheDocument();
      expect(screen.getByText(transferType)).toBeInTheDocument();
      expect(screen.getByTestId('green-plus-icon')).toBeInTheDocument();
      expect(
        screen.getByText(`${currency} ${amount.toFixed(2)}`),
      ).toBeInTheDocument();
      expect(screen.getByText(template)).toBeInTheDocument();
      expect(screen.getByText(`${date} ${time}`)).toBeInTheDocument();
    });

    it('renders red minus icon if transaction type is EXPENSE', () => {
      jest.clearAllMocks();

      mockTransaction.type = 'EXPENSE';
      renderSingleTransaction(mockTransaction);

      expect(screen.getByTestId('red-minus-icon')).toBeInTheDocument();
    });

    it('opens the Payment Receipt Modal when the ChevronRight icon button is clicked', async () => {
      const openModalButton = screen.getByTestId('open-modal-btn');

      await userEvent.click(openModalButton);

      expect(screen.getByTestId('payment-receipt-modal')).toBeInTheDocument();
    });
  });
});
