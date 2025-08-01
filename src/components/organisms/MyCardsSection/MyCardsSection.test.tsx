import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MyCardsSection } from './MyCardsSection';

import { TUserBankCardComponent } from 'components/molecules/UserBankCard/UserBankCard';
import * as hooks from 'hooks/user/useUserCards';
import { IUserBankCard } from 'models/IUser';

jest.mock('../Sidebar/molecules', () => ({
  EmptySection: () => <div data-testid="empty-section">Empty Section</div>,
  CardDetails: ({ data }: { data: IUserBankCard }) => (
    <div data-testid="card-details">
      Card Details: {data?.number || 'No number'}
    </div>
  ),
  StaticCardStack: () => <div data-testid="static-stack">Static Stack</div>,
}));

jest.mock('./molecules/CardStackCarousel/CardStackCarousel', () => ({
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

jest.mock('components/molecules/UserBankCard/UserBankCard', () => ({
  UserBankCard: ({ data }: { data: TUserBankCardComponent }) => (
    <div data-testid="user-bank-card">
      UserBankCard {data?.number || 'No number'}
    </div>
  ),
}));

describe('MyCards', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const createMockCard = (
    number: number,
    holder: string,
  ): Omit<IUserBankCard, 'cvv' | 'iban' | 'swift'> => ({
    id: 1,
    number,
    holder,
    name: 'Strong Card',
    issuer: 'visa',
    issueDate: '2020-01-01',
    cashbackRate: 1.5,
    expirationDate: '2025-01-01',
    balance: 1000,
    currency: 'PLN',
    issueType: 'plastic',
    status: 'active',
    type: 'credit',
    dailyLimit: 0,
    isPrimary: false,
  });

  it('renders loading state', () => {
    jest
      .spyOn(hooks, 'useUserCards')
      .mockReturnValue({ data: [], isLoading: true, isError: false });

    render(<MyCardsSection />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders empty state when no cards', () => {
    jest
      .spyOn(hooks, 'useUserCards')
      .mockReturnValue({ data: [], isLoading: false, isError: false });

    render(<MyCardsSection />);

    expect(screen.getByTestId('empty-section')).toBeInTheDocument();
  });

  it('renders with cards and card details', () => {
    const mockCards: Omit<IUserBankCard, 'cvv' | 'iban' | 'swift'>[] = [
      createMockCard(1234, 'John Doe'),
      createMockCard(5678, 'Jane Doe'),
    ];

    jest
      .spyOn(hooks, 'useUserCards')
      .mockReturnValue({ data: mockCards, isLoading: false, isError: false });

    render(<MyCardsSection />);

    expect(screen.getByTestId('carousel')).toBeInTheDocument();
    expect(screen.getAllByTestId('user-bank-card')).toHaveLength(2);

    expect(screen.getAllByText(/UserBankCard/)).toHaveLength(2);
    expect(screen.getByTestId('card-details')).toBeInTheDocument();
  });

  it('changes selected card on carousel interaction', async () => {
    const mockCards: Omit<IUserBankCard, 'cvv' | 'iban' | 'swift'>[] = [
      createMockCard(1234, 'John Doe'),
      createMockCard(5678, 'Jane Doe'),
    ];

    jest
      .spyOn(hooks, 'useUserCards')
      .mockReturnValue({ data: mockCards, isLoading: false, isError: false });

    render(<MyCardsSection />);

    await waitFor(() => {
      expect(screen.getByTestId('card-details')).toBeInTheDocument();
    });

    const changeButton = screen.getByRole('button', {
      name: /change to card 1/i,
    });
    act(() => userEvent.click(changeButton));

    expect(screen.getByTestId('carousel')).toHaveTextContent(
      'Carousel index 1',
    );
  });
});
