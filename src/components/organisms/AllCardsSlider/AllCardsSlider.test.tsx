import { render, screen, fireEvent } from '@testing-library/react';

import { AllCardsSlider } from './AllCardsSlider';

import { IUserBankCard } from 'models/IUserBankCard';

interface ComponentProps {
  children: React.ReactNode;
  'data-testid'?: string;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  'data-testid'?: string;
}

interface CardsContentProps {
  isLoading: boolean;
  hasError: boolean;
  userBankCards?: Array<{
    id: string | number;
    cardNumber: string;
    cardType: string;
  }>;
  onCardClick: (cardId: IUserBankCard['id']) => void;
  getCardTransform: (cardId: IUserBankCard['id']) => { transform: string };
  openIssueCardModal: () => void;
}

interface IssueCardModalProps {
  open: boolean;
  onClose: () => void;
  'data-testid'?: string;
}

interface UseGetUserCardsReturn {
  data: Array<{
    id: string;
    cardNumber: string;
    cardType: string;
  }> | null;
  isLoading: boolean;
  isError: boolean;
}

interface MockDisclosure {
  isOpen: boolean;
  open: jest.Mock;
  close: jest.Mock;
}

interface TranslationFunction {
  (key: string): string;
}

jest.mock('./AllCardsSlider.styled', () => ({
  StyledContainer: ({ children, ...props }: ComponentProps) => (
    <div {...props}>{children}</div>
  ),
  StyledTitleContainer: ({ children, ...props }: ComponentProps) => (
    <div {...props}>{children}</div>
  ),
  StyledTitle: ({ children, ...props }: ComponentProps) => (
    <h1 {...props}>{children}</h1>
  ),
  StyledIconButton: ({
    children,
    onClick,
    disabled,
    ...props
  }: ButtonProps) => (
    <button onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  ),
}));

jest.mock('./molecules/CardsContent/CardsContent', () => ({
  CardsContent: ({
    isLoading,
    hasError,
    userBankCards,
    onCardClick,
    getCardTransform,
    openIssueCardModal,
  }: CardsContentProps) => (
    <div data-testid="cards-content">
      <div data-testid="loading-state">
        {isLoading ? 'loading' : 'not-loading'}
      </div>
      <div data-testid="error-state">{hasError ? 'error' : 'no-error'}</div>
      <div data-testid="cards-count">{userBankCards?.length || 0}</div>
      {userBankCards?.map((card) => (
        <button
          key={card.id}
          data-testid={`card-${card.id}`}
          onClick={() => onCardClick(card.id)}
          style={getCardTransform(card.id)}
        >
          Card {card.id}
        </button>
      ))}
      <button data-testid="open-modal-button" onClick={openIssueCardModal}>
        Open Modal
      </button>
    </div>
  ),
}));

jest.mock('../IssueCardModal/IssueCardModal', () => ({
  IssueCardModal: ({ open, onClose, ...props }: IssueCardModalProps) =>
    open ? (
      <div {...props}>
        <div>Issue Card Modal</div>
        <button onClick={onClose} data-testid="close-modal-button">
          Close
        </button>
      </div>
    ) : null,
}));

const mockUseUserCards = jest.fn<UseGetUserCardsReturn, []>();

jest.mock('hooks/user/useUserCards', () => ({
  useUserCards: () => mockUseUserCards(),
}));

const mockDisclosure: MockDisclosure = {
  isOpen: false,
  open: jest.fn(),
  close: jest.fn(),
};

jest.mock('hooks/shared/useDisclosure', () => ({
  useDisclosure: () => mockDisclosure,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: ((key: string) => {
      const translations: Record<string, string> = {
        title: 'All Cards',
      };
      return translations[key] || key;
    }) as TranslationFunction,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const mockOnCardIdSelect = jest.fn<void, [IUserBankCard['id']]>();
const defaultProps = {
  onCardIdSelect: mockOnCardIdSelect,
  selectedCardId: '',
};

const mockCards = [
  { id: '1', cardNumber: '1234', cardType: 'VISA' },
  { id: '2', cardNumber: '5678', cardType: 'MASTER' },
];

describe('AllCardsSlider', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockDisclosure.isOpen = false;
    mockDisclosure.open.mockClear();
    mockDisclosure.close.mockClear();

    mockUseUserCards.mockReturnValue({
      data: mockCards,
      isLoading: false,
      isError: false,
    });
  });

  describe('Component Rendering', () => {
    it('renders title and add button', () => {
      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.getByTestId('title')).toBeInTheDocument();
      expect(screen.getByText('All Cards')).toBeInTheDocument();
      expect(screen.getByTestId('icon-button')).toBeInTheDocument();
    });

    it('renders main container and title container', () => {
      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.getByTestId('main-container')).toBeInTheDocument();
      expect(screen.getByTestId('title-container')).toBeInTheDocument();
    });

    it('renders CardsContent component', () => {
      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.getByTestId('cards-content')).toBeInTheDocument();
    });
  });

  describe('Data Loading States', () => {
    it('shows loading state when data is loading', () => {
      mockUseUserCards.mockReturnValue({
        data: null,
        isLoading: true,
        isError: false,
      });

      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.getByTestId('loading-state')).toHaveTextContent('loading');
    });

    it('shows no loading when data is loaded', () => {
      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.getByTestId('loading-state')).toHaveTextContent(
        'not-loading',
      );
    });
  });

  describe('Error Handling', () => {
    it('shows error state when hook returns error', () => {
      mockUseUserCards.mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
      });

      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.getByTestId('error-state')).toHaveTextContent('error');
    });

    it('disables add button when there is an error', () => {
      mockUseUserCards.mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
      });

      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.getByTestId('icon-button')).toBeDisabled();
    });

    it('enables add button when there is no error', () => {
      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.getByTestId('icon-button')).not.toBeDisabled();
    });
  });

  describe('Data Flow', () => {
    it('passes correct card data to CardsContent', () => {
      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.getByTestId('cards-count')).toHaveTextContent('2');
    });

    it('handles empty cards data', () => {
      mockUseUserCards.mockReturnValue({
        data: [],
        isLoading: false,
        isError: false,
      });

      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.getByTestId('cards-count')).toHaveTextContent('0');
    });

    it('handles null cards data', () => {
      mockUseUserCards.mockReturnValue({
        data: null,
        isLoading: false,
        isError: false,
      });

      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.getByTestId('cards-count')).toHaveTextContent('0');
    });
  });

  describe('Card Interactions', () => {
    it('calls onCardIdSelect when card is clicked', () => {
      render(<AllCardsSlider {...defaultProps} />);

      const card1 = screen.getByTestId('card-1');
      fireEvent.click(card1);

      expect(mockOnCardIdSelect).toHaveBeenCalledWith('1');
    });

    it('applies correct transform for selected card', () => {
      render(<AllCardsSlider {...defaultProps} selectedCardId="1" />);

      const card1 = screen.getByTestId('card-1');
      const card2 = screen.getByTestId('card-2');

      expect(card1).toHaveStyle({ transform: 'scale(1.12)' });
      expect(card2).toHaveStyle({ transform: 'scale(1)' });
    });

    it('calls onCardIdSelect for different cards', () => {
      render(<AllCardsSlider {...defaultProps} />);

      const card2 = screen.getByTestId('card-2');
      fireEvent.click(card2);

      expect(mockOnCardIdSelect).toHaveBeenCalledWith('2');
    });

    it('applies no transform when no card is selected', () => {
      render(<AllCardsSlider {...defaultProps} selectedCardId="" />);

      const card1 = screen.getByTestId('card-1');
      const card2 = screen.getByTestId('card-2');

      expect(card1).toHaveStyle({ transform: 'scale(1)' });
      expect(card2).toHaveStyle({ transform: 'scale(1)' });
    });
  });

  describe('Modal Interactions', () => {
    it('does not show modal initially', () => {
      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.queryByTestId('issue-card-modal')).not.toBeInTheDocument();
    });

    it('opens modal when add button is clicked', () => {
      render(<AllCardsSlider {...defaultProps} />);

      const addButton = screen.getByTestId('icon-button');
      fireEvent.click(addButton);

      expect(mockDisclosure.open).toHaveBeenCalledTimes(1);
    });

    it('opens modal when CardsContent requests it', () => {
      render(<AllCardsSlider {...defaultProps} />);

      const openModalButton = screen.getByTestId('open-modal-button');
      fireEvent.click(openModalButton);

      expect(mockDisclosure.open).toHaveBeenCalledTimes(1);
    });

    it('shows modal when isOpen is true', () => {
      mockDisclosure.isOpen = true;

      render(<AllCardsSlider {...defaultProps} />);

      expect(screen.getByTestId('issue-card-modal')).toBeInTheDocument();
      expect(screen.getByText('Issue Card Modal')).toBeInTheDocument();
    });

    it('closes modal when close button is clicked', () => {
      mockDisclosure.isOpen = true;

      render(<AllCardsSlider {...defaultProps} />);

      const closeButton = screen.getByTestId('close-modal-button');
      fireEvent.click(closeButton);

      expect(mockDisclosure.close).toHaveBeenCalledTimes(1);
    });

    it('does not open modal when add button is disabled', () => {
      mockUseUserCards.mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
      });

      render(<AllCardsSlider {...defaultProps} />);

      const addButton = screen.getByTestId('icon-button');
      fireEvent.click(addButton);

      expect(mockDisclosure.open).not.toHaveBeenCalled();
    });
  });

  describe('Props Integration', () => {
    it('passes all required props to CardsContent', () => {
      render(<AllCardsSlider {...defaultProps} selectedCardId="1" />);

      expect(screen.getByTestId('cards-content')).toBeInTheDocument();
      expect(screen.getByTestId('loading-state')).toHaveTextContent(
        'not-loading',
      );
      expect(screen.getByTestId('error-state')).toHaveTextContent('no-error');
      expect(screen.getByTestId('cards-count')).toHaveTextContent('2');

      expect(screen.getByTestId('card-1')).toHaveStyle({
        transform: 'scale(1.12)',
      });
    });

    it('handles selectedCardId changes', () => {
      const { rerender } = render(
        <AllCardsSlider {...defaultProps} selectedCardId="1" />,
      );

      expect(screen.getByTestId('card-1')).toHaveStyle({
        transform: 'scale(1.12)',
      });
      expect(screen.getByTestId('card-2')).toHaveStyle({
        transform: 'scale(1)',
      });

      rerender(<AllCardsSlider {...defaultProps} selectedCardId="2" />);

      expect(screen.getByTestId('card-1')).toHaveStyle({
        transform: 'scale(1)',
      });
      expect(screen.getByTestId('card-2')).toHaveStyle({
        transform: 'scale(1.12)',
      });
    });
  });
});
