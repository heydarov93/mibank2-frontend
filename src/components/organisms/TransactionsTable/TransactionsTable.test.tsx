import { SelectChangeEvent, ThemeProvider } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';
import { MouseEvent } from 'react';

import { TransactionsTable } from './TransactionsTable';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        title: 'Transaction History',
        'columnHeaders.source': 'Source',
        'columnHeaders.transferType': 'Transfer type',
        'columnHeaders.sum': 'Sum',
        'columnHeaders.template': 'Template',
        'columnHeaders.date': 'Date',
      };
      return translations[key] || key;
    },
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('./molecules', () => ({
  TransferFilters: ({ sx }: { sx?: object }) => (
    <div data-testid="transfer-filters" />
  ),
}));

jest.mock('components/molecules', () => ({
  CustomTableRow: ({
    sourceNumber,
    template,
    amount,
    currency,
  }: {
    sourceNumber: string;
    template: string;
    isIncome: boolean;
    date: string;
    time: string;
    amount: number;
    currency: string;
  }) => (
    <tr data-testid="custom-table-row">
      <td>{sourceNumber}</td>
      <td>
        {amount} {currency}
      </td>
      <td>{template}</td>
    </tr>
  ),
}));

jest.mock(
  'components/molecules/CustomTablePagination/CustomTablePagination',
  () => ({
    __esModule: true,
    default: ({
      page,
      rowsPerPage,
      pageDisplayText,
      onPageChange,
      onRowsPerPageChange,
    }: {
      totalPages: number;
      page: number;
      rowsPerPage: number;
      pageDisplayText: string;
      onPageChange: (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => void;
      onRowsPerPageChange: (event: SelectChangeEvent<number>) => void;
    }) => (
      <div data-testid="custom-table-pagination">
        <span data-testid="page-display">{pageDisplayText}</span>
        <button
          data-testid="next-page"
          onClick={() => onPageChange(null, page + 1)}
        >
          Next
        </button>
        <select
          data-testid="rows-per-page-select"
          value={rowsPerPage}
          onChange={(e) =>
            onRowsPerPageChange({
              target: { value: e.target.value },
            } as SelectChangeEvent<number>)
          }
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
        </select>
      </div>
    ),
  }),
);

jest.mock('hooks', () => ({
  usePaginationInfo: (
    totalItems: number,
    page: number,
    rowsPerPage: number,
  ) => ({
    totalPages: Math.ceil(totalItems / rowsPerPage),
    pageDisplayText: `${page + 1} of ${Math.ceil(totalItems / rowsPerPage)}`,
  }),
}));

jest.mock('utils/formatters', () => ({
  formatTransactionDate: (datetime: string) => ({
    date: datetime.split(' ')[0],
    time: datetime.split(' ')[1],
  }),
  formatCardNumber: (cardName: string, cardNumber: string) =>
    `${cardName} •••• ${cardNumber.slice(-4)}`,
  formatIbanNumber: (iban: string) => {
    const firstFour = iban.slice(0, 4);
    const lastFour = iban.slice(-4);
    return `${firstFour} **** ${lastFour}`;
  },
}));

describe('TransactionsTable', () => {
  describe('Rendering', () => {
    it('renders table with basic structure', () => {
      render(
        <ThemeProvider theme={theme}>
          <TransactionsTable />
        </ThemeProvider>,
      );

      expect(screen.getByText('Transaction History')).toBeInTheDocument();
      expect(screen.getByText('Source')).toBeInTheDocument();
      expect(screen.getByText('Transfer type')).toBeInTheDocument();
      expect(screen.getByText('Sum')).toBeInTheDocument();
      expect(screen.getByText('Template')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
    });

    it('renders transaction rows', () => {
      render(
        <ThemeProvider theme={theme}>
          <TransactionsTable />
        </ThemeProvider>,
      );

      const tableRows = screen.getAllByTestId('custom-table-row');
      expect(tableRows).toHaveLength(10);
    });

    it('renders pagination controls', () => {
      render(
        <ThemeProvider theme={theme}>
          <TransactionsTable />
        </ThemeProvider>,
      );

      expect(screen.getByTestId('custom-table-pagination')).toBeInTheDocument();
      expect(screen.getByTestId('page-display')).toHaveTextContent('1 of 2');
    });
  });

  describe('Pagination', () => {
    it('navigates to next page', () => {
      render(
        <ThemeProvider theme={theme}>
          <TransactionsTable />
        </ThemeProvider>,
      );

      fireEvent.click(screen.getByTestId('next-page'));

      expect(screen.getByTestId('page-display')).toHaveTextContent('2 of 2');
    });

    it('changes rows per page', () => {
      render(
        <ThemeProvider theme={theme}>
          <TransactionsTable />
        </ThemeProvider>,
      );

      fireEvent.change(screen.getByTestId('rows-per-page-select'), {
        target: { value: '25' },
      });

      expect(screen.getByTestId('page-display')).toHaveTextContent('1 of 1');
    });
  });

  describe('Data Display', () => {
    it('displays formatted transaction data', () => {
      render(
        <ThemeProvider theme={theme}>
          <TransactionsTable />
        </ThemeProvider>,
      );

      expect(screen.getByText(/Strong Card •••• 1234/)).toBeInTheDocument();
      expect(screen.getByText(/132\.4 PLN/)).toBeInTheDocument();
    });
  });
});
