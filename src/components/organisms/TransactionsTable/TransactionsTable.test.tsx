import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';

import { TransactionsTable } from './TransactionsTable';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        title: 'Transactions',
        'columnHeaders.card': 'Card',
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

jest.mock('components/molecules', () => ({
  CustomTableRow: ({ cardNumber, amount, template }: any) => (
    <tr data-testid="table-row">
      <td>{cardNumber}</td>
      <td>{amount}</td>
      <td>{template}</td>
    </tr>
  ),
}));

jest.mock(
  'components/molecules/CustomTablePagination/CustomTablePagination',
  () => {
    return function MockCustomTablePagination({
      onPageChange,
      onRowsPerPageChange,
    }: any) {
      return (
        <div data-testid="pagination">
          <button onClick={() => onPageChange(null, 1)} data-testid="next-page">
            Next
          </button>
          <button
            onClick={() => onRowsPerPageChange({ target: { value: 20 } })}
            data-testid="change-rows"
          >
            Change Rows
          </button>
        </div>
      );
    };
  },
);

jest.mock('hooks', () => ({
  usePaginationInfo: () => ({
    totalPages: 15,
    pageDisplayText: '1 - 10 of 15 items',
  }),
}));

jest.mock('./utils/formatValueUtils', () => ({
  formatCardNumber: (name: string, number: string) => `${name} - ${number}`,
  formatDateTime: (datetime: string) => ({
    date: '2025-03-28',
    time: '15:21',
  }),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('TransactionsTable', () => {
  beforeEach(() => {
    renderWithTheme(<TransactionsTable />);
    jest.clearAllMocks();
  });

  it('should render table with header and transactions', () => {
    expect(screen.getByText('Transactions')).toBeInTheDocument();
    expect(screen.getByText('Card')).toBeInTheDocument();
    expect(screen.getByText('Sum')).toBeInTheDocument();
    expect(screen.getByText('Template')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getAllByTestId('table-row')).toHaveLength(10);
  });

  it('should render pagination component', () => {
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('next-page')).toBeInTheDocument();
  });

  it('should handle page changes', async () => {
    const nextButton = screen.getByTestId('next-page');
    fireEvent.click(nextButton);

    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });

  it('should handle rows per page changes', async () => {
    const changeRowsButton = screen.getByTestId('change-rows');
    fireEvent.click(changeRowsButton);

    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });

  it('should render correct table structure', () => {
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getAllByRole('columnheader')).toHaveLength(5);
    expect(screen.getAllByTestId('table-row')).toHaveLength(10);
  });

  it('should display transaction data correctly', () => {
    const tableRows = screen.getAllByTestId('table-row');
    expect(tableRows[0]).toBeInTheDocument();

    expect(
      screen.getByText('Strong Card - 1234 1234 1234 1234'),
    ).toBeInTheDocument();
  });
});
