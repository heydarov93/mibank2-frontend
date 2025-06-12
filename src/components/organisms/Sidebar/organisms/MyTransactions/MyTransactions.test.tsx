import { render, screen, fireEvent } from '@testing-library/react';

import { MyTransactions } from './MyTransactions';
import { useGetTransactions } from './hooks/useGetTransactions';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('./hooks/useGetTransactions');

jest.mock('../../molecules/Transactions/Transactions', () => ({
  Transactions: ({ data }: any) => (
    <div data-testid="transactions">{JSON.stringify(data)}</div>
  ),
}));

describe('MyTransactions', () => {
  const mockUseGetTransactions = useGetTransactions as jest.Mock;

  it('renders EmptySection when isError', () => {
    mockUseGetTransactions.mockReturnValue({
      transactions: { all: [], income: [], expenses: [] },
      isLoading: false,
      isError: true,
    });

    render(<MyTransactions />);

    expect(screen.getByTestId('empty-section-description')).toHaveTextContent(
      'emptySectionConnectionError',
    );
  });

  it('renders CircularProgress when isLoading', () => {
    mockUseGetTransactions.mockReturnValue({
      transactions: { all: [], income: [], expenses: [] },
      isLoading: true,
      isError: false,
    });

    render(<MyTransactions />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders EmptySection when transactions are empty', () => {
    mockUseGetTransactions.mockReturnValue({
      transactions: { all: [], income: [], expenses: [] },
      isLoading: false,
      isError: false,
    });

    render(<MyTransactions />);

    expect(screen.getByTestId('empty-section-description')).toHaveTextContent(
      'emptySectionDefault',
    );
  });

  it('renders transactions tabs and changes tabs correctly', () => {
    const mockTransactions = {
      all: [{ id: 1, amount: 100 }],
      income: [{ id: 2, amount: 200 }],
      expenses: [{ id: 3, amount: 300 }],
    };

    mockUseGetTransactions.mockReturnValue({
      transactions: mockTransactions,
      isLoading: false,
      isError: false,
    });

    render(<MyTransactions />);

    expect(screen.getByTestId('my-transactions')).toBeInTheDocument();
    expect(screen.getByText('myTransactions.all')).toBeInTheDocument();
    expect(screen.getByText('myTransactions.income')).toBeInTheDocument();
    expect(screen.getByText('myTransactions.expenses')).toBeInTheDocument();

    expect(screen.getByTestId('transactions')).toHaveTextContent(
      JSON.stringify(mockTransactions.all),
    );

    fireEvent.click(screen.getByText('myTransactions.income'));
    expect(screen.getByTestId('transactions')).toHaveTextContent(
      JSON.stringify(mockTransactions.income),
    );

    fireEvent.click(screen.getByText('myTransactions.expenses'));
    expect(screen.getByTestId('transactions')).toHaveTextContent(
      JSON.stringify(mockTransactions.expenses),
    );
  });

  it('matches snapshot', () => {
    const mockTransactions = {
      all: [{ id: 1, amount: 100 }],
      income: [{ id: 2, amount: 200 }],
      expenses: [{ id: 3, amount: 300 }],
    };

    mockUseGetTransactions.mockReturnValue({
      transactions: mockTransactions,
      isLoading: false,
      isError: false,
    });

    const { asFragment } = render(<MyTransactions />);
    expect(asFragment()).toMatchSnapshot();
  });
});
