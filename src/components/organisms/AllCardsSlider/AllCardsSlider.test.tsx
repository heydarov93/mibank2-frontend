import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AllCardsSlider } from './AllCardsSlider';

import { IUserBankCard } from 'models/IUserCard';
import { theme } from 'theme/theme';

const mockUseGetUserCards = jest.fn();
jest.mock('../Sidebar/organisms/MyCards/hooks/useGetUserCards', () => ({
  useGetUserCards: () => mockUseGetUserCards(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        title: 'All Cards',
        subTitle: 'Choose a card to see its details',
      };
      return translations[key] || key;
    },
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('./molecules/NoCard', () => ({
  NoCard: () => <div data-testid="no-card">No cards available</div>,
}));

jest.mock('./molecules/UserCardsCarousel', () => ({
  UserCardsCarousel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="user-cards-carousel">{children}</div>
  ),
}));

jest.mock('components/molecules/UserBankCard/UserBankCard', () => ({
  UserBankCard: ({
    card,
    onCardClick,
    isSelected,
  }: {
    card: IUserBankCard;
    onCardClick: () => void;
    isSelected: boolean;
  }) => (
    <div
      data-testid="user-bank-card"
      data-card-id={card.id}
      data-selected={isSelected}
      onClick={onCardClick}
    >
      Card number: {card.number}
    </div>
  ),
}));

const renderAllCardsSlider = (props = {}) => {
  const defaultProps = {
    onCardSelect: jest.fn(),
    selectedCardId: '',
    ...props,
  };

  return render(
    <ThemeProvider theme={theme}>
      <AllCardsSlider {...defaultProps} />
    </ThemeProvider>,
  );
};

describe('AllCardsSlider', () => {
  const mockCards: IUserBankCard[] = [
    {
      id: 1,
      name: 'Primary Card',
      number: 4532123456789012,
      balance: 3200.5,
      currency: 'USD',
      issuer: 'visa',
      expirationDate: '08/2027',
      type: 'plastic',
      status: 'active',
      holder: 'John Doe',
      cvv: 123,
      iban: 'US64SVBKUS6S3300958879',
      swift: 'SVBKUS6S',
      issueDate: '2022.05.15',
      cashbackRate: 1.5,
    },
    {
      id: 2,
      name: 'Travel Card',
      number: 5500123412341234,
      balance: 850.75,
      currency: 'EUR',
      issuer: 'mastercard',
      expirationDate: '03/2024',
      type: 'digital',
      status: 'expired',
      holder: 'John Doe',
      cvv: 456,
      iban: 'DE89370400440532013000',
      swift: 'DEUTDEDBBER',
      issueDate: '2023.01.20',
      cashbackRate: 2.0,
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Empty state', () => {
    it('should show NoCard when no cards exist', () => {
      mockUseGetUserCards.mockReturnValue({ data: [] });

      renderAllCardsSlider();

      expect(screen.getByTestId('no-card')).toBeInTheDocument();
      expect(screen.queryByTestId('cards-container')).not.toBeInTheDocument();
    });
  });

  describe('Cards display', () => {
    it('should show cards carousel when cards exist', () => {
      mockUseGetUserCards.mockReturnValue({ data: mockCards });

      renderAllCardsSlider();

      expect(screen.getByTestId('cards-container')).toBeInTheDocument();
      expect(
        screen.getByText('Choose a card to see its details'),
      ).toBeInTheDocument();
      expect(screen.getByText('All Cards')).toBeInTheDocument();
      expect(screen.getByTestId('user-cards-carousel')).toBeInTheDocument();
      expect(screen.queryByTestId('no-card')).not.toBeInTheDocument();
    });

    it('should render each card with correct props', () => {
      mockUseGetUserCards.mockReturnValue({ data: mockCards });

      renderAllCardsSlider({ selectedCardId: 1 });

      const cards = screen.getAllByTestId('user-bank-card');
      expect(cards).toHaveLength(2);

      expect(cards[0]).toHaveAttribute('data-card-id', '1');
      expect(cards[0]).toHaveAttribute('data-selected', 'true');
      expect(cards[1]).toHaveAttribute('data-card-id', '2');
      expect(cards[1]).toHaveAttribute('data-selected', 'false');
    });
  });

  describe('Card selection', () => {
    it('should call onCardSelect when card is clicked', async () => {
      const mockOnCardSelect = jest.fn();
      mockUseGetUserCards.mockReturnValue({ data: mockCards });

      renderAllCardsSlider({ onCardSelect: mockOnCardSelect });

      await userEvent.click(screen.getAllByTestId('user-bank-card')[0]);

      expect(mockOnCardSelect).toHaveBeenCalledWith(mockCards[0]);
    });

    it('should highlight selected card', () => {
      mockUseGetUserCards.mockReturnValue({ data: mockCards });

      renderAllCardsSlider({ selectedCardId: 2 });

      const cards = screen.getAllByTestId('user-bank-card');
      expect(cards[0]).toHaveAttribute('data-selected', 'false');
      expect(cards[1]).toHaveAttribute('data-selected', 'true');
    });

    it('should handle no selected card', () => {
      mockUseGetUserCards.mockReturnValue({ data: mockCards });

      renderAllCardsSlider({ selectedCardId: '' });

      const cards = screen.getAllByTestId('user-bank-card');
      expect(cards[0]).toHaveAttribute('data-selected', 'false');
      expect(cards[1]).toHaveAttribute('data-selected', 'false');
    });
  });

  describe('Basic rendering', () => {
    it('should render title and add button', () => {
      mockUseGetUserCards.mockReturnValue({ data: [] });

      renderAllCardsSlider();

      expect(screen.getByText('All Cards')).toBeInTheDocument();
      expect(screen.getByTestId('icon-button')).toBeInTheDocument();
    });
  });
});
