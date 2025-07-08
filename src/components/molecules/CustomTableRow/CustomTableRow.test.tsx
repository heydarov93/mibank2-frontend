import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';

import { CustomTableRow } from './CustomTableRow';

import { theme } from 'theme/theme';

const defaultProps = {
  sourceNumber: '1234 **** **** 5678',
  transferType: 'Card',
  currency: 'PLN',
  amount: 150.75,
  template: 'Online Payment',
  date: '2024-01-15',
  time: '14:30:00',
  isIncome: false,
  handleShowPaymentReceipt: jest.fn(),
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <table>
        <tbody>{component}</tbody>
      </table>
    </ThemeProvider>,
  );
};

describe('CustomTableRow', () => {
  it('should render all table data correctly', () => {
    renderWithTheme(<CustomTableRow {...defaultProps} />);

    expect(screen.getByText('1234 **** **** 5678')).toBeInTheDocument();
    expect(screen.getByText('PLN 150.75')).toBeInTheDocument();
    expect(screen.getByText('Online Payment')).toBeInTheDocument();
    expect(screen.getByText('2024-01-15 14:30:00')).toBeInTheDocument();
    expect(screen.getByTestId('table-row')).toBeInTheDocument();
    expect(screen.getByTestId('chevron-right')).toBeInTheDocument();
  });

  it('should display income with green plus icon', () => {
    renderWithTheme(<CustomTableRow {...defaultProps} isIncome={true} />);

    expect(screen.getByTestId('green-plus-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('red-minus-icon')).not.toBeInTheDocument();
    expect(screen.getByTestId('amount-text')).toHaveAttribute(
      'data-income',
      'true',
    );
  });

  it('should display expense with red minus icon', () => {
    renderWithTheme(<CustomTableRow {...defaultProps} isIncome={false} />);

    expect(screen.getByTestId('red-minus-icon')).toBeInTheDocument();
    expect(screen.queryByTestId('green-plus-icon')).not.toBeInTheDocument();
    expect(screen.getByTestId('amount-text')).toHaveAttribute(
      'data-income',
      'false',
    );
  });

  it('should format amount to 2 decimal places', () => {
    renderWithTheme(<CustomTableRow {...defaultProps} amount={100} />);

    expect(screen.getByText('PLN 100.00')).toBeInTheDocument();
  });

  it('should handle different currencies', () => {
    renderWithTheme(
      <CustomTableRow {...defaultProps} currency="USD" amount={50} />,
    );

    expect(screen.getByText('USD 50.00')).toBeInTheDocument();
  });

  it('should render correct number of table cells', () => {
    renderWithTheme(<CustomTableRow {...defaultProps} />);

    const tableCells = screen.getAllByRole('cell');
    expect(tableCells).toHaveLength(5);
  });
});
