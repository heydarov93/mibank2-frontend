import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MyCards } from './MyCards';
import * as hooks from './hooks/useGetUserCards';

import { IUserBankCard } from 'components/molecules/UserBankCard/UserBankCard';

jest.mock('../../molecules/EmptySection/EmptySection', () => ({
  EmptySection: () => <div data-testid="empty-section">Empty Section</div>,
}));

jest.mock('../../molecules/CardDetails/CardDetails', () => ({
  CardDetails: ({ data }: { data: IUserBankCard }) => (
    <div data-testid="card-details">Card Details: {data.number}</div>
  ),
}));

jest.mock('../CardStackCarousel/CardStackCarousel', () => ({
  CardStackCarousel: ({
    index,
    onChange,
    children,
  }: {
    index: number;
    onChange: (current: number) => void;
    children: React.ReactNode;
  }) => (
    <div>
      <div data-testid="carousel">Carousel index {index}</div>
      {children}
      <button onClick={() => onChange(1)}>Change to card 1</button>
    </div>
  ),
}));

jest.mock('../../molecules/StaticCardStack/StaticCardStack', () => ({
  StaticCardStack: () => <div data-testid="static-stack">Static Stack</div>,
}));

jest.mock('components/molecules/UserBankCard/UserBankCard', () => ({
  UserBankCard: ({ data }: { data: IUserBankCard }) => (
    <div data-testid="user-bank-card">UserBankCard {data.number}</div>
  ),
}));

describe('MyCards', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const createMockCard = (number: number, holder: string): IUserBankCard => ({
    number,
    holder,
    name: holder,
    issuer: 'visa',
    cvv: 123,
    iban: 'PL00TESTIBAN',
    swift: 'TESTSWIFT',
    issueDate: '2020-01-01',
    cashbackRate: 1.5,
    expirationDate: '2025-01-01',
    balance: 1000,
    currency: 'PLN',
    type: 'plastic',
    status: 'active',
  });

  it('renders loading state', () => {
    jest
      .spyOn(hooks, 'useGetUserCards')
      .mockReturnValue({ data: [], isLoading: true, isError: false });

    render(<MyCards />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders empty state when no cards', () => {
    jest
      .spyOn(hooks, 'useGetUserCards')
      .mockReturnValue({ data: [], isLoading: false, isError: false });

    render(<MyCards />);

    expect(screen.getByTestId('empty-section')).toBeInTheDocument();
  });

  it('renders with cards and card details', () => {
    const mockCards: IUserBankCard[] = [
      createMockCard(1234, 'John Doe'),
      createMockCard(5678, 'Jane Doe'),
    ];

    jest
      .spyOn(hooks, 'useGetUserCards')
      .mockReturnValue({ data: mockCards, isLoading: false, isError: false });

    render(<MyCards />);

    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    expect(screen.getAllByTestId('user-bank-card')).toHaveLength(2);
    expect(screen.getByText(/UserBankCard 1234/)).toBeInTheDocument();
    expect(screen.getByTestId('card-details')).toHaveTextContent('1234');
  });

  it('changes selected card on carousel interaction', async () => {
    const mockCards: IUserBankCard[] = [
      createMockCard(1234, 'John Doe'),
      createMockCard(5678, 'Jane Doe'),
    ];

    jest
      .spyOn(hooks, 'useGetUserCards')
      .mockReturnValue({ data: mockCards, isLoading: false, isError: false });

    render(<MyCards />);

    expect(screen.getByTestId('card-details')).toHaveTextContent('1234');

    act(() =>
      userEvent.click(
        screen.getByRole('button', { name: /change to card 1/i }),
      ),
    );

    await waitFor(() => {
      expect(screen.getByTestId('card-details')).toHaveTextContent('5678');
    });
  });

  it('matches snapshot', () => {
    const mockCards: IUserBankCard[] = [
      createMockCard(1234, 'John Doe'),
      createMockCard(5678, 'Jane Doe'),
    ];
    jest
      .spyOn(hooks, 'useGetUserCards')
      .mockReturnValue({ data: mockCards, isLoading: false, isError: false });

    const { container } = render(<MyCards />);
    expect(container).toMatchSnapshot();
  });
});
