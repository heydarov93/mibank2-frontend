import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';

import { UserBankCardsCarousel } from '../UserBankCardsCarousel';

import { theme } from 'theme/theme';

const mockUseGetUserCards = jest.fn();
jest.mock(
  'components/organisms/Sidebar/organisms/MyCards/hooks/useGetUserCards',
  () => ({
    useGetUserCards: () => mockUseGetUserCards(),
  }),
);

jest.mock('@mui/icons-material', () => ({
  ChevronLeftRounded: () => <span data-testid="chevron-left">←</span>,
  ChevronRightRounded: () => <span data-testid="chevron-right">→</span>,
}));

const renderUserCardsCarousel = (children?: ReactNode) => {
  return render(
    <ThemeProvider theme={theme}>
      <UserBankCardsCarousel>{children}</UserBankCardsCarousel>
    </ThemeProvider>,
  );
};

describe('UserCardsCarousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render carousel structure with navigation and pagination', () => {
      mockUseGetUserCards.mockReturnValue({ data: [1, 2, 3] });

      renderUserCardsCarousel();

      expect(screen.getByTestId('nav-button-left')).toBeInTheDocument();
      expect(screen.getByTestId('nav-button-right')).toBeInTheDocument();
      expect(screen.getByTestId('cards-track')).toBeInTheDocument();
      expect(screen.getByTestId('pagination-container')).toBeInTheDocument();
    });

    it('should render children content', () => {
      mockUseGetUserCards.mockReturnValue({ data: [1, 2, 3] });

      renderUserCardsCarousel(<div data-testid="test-child">Card Content</div>);

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });
  });

  describe('Navigation buttons', () => {
    it('should disable left button initially', () => {
      mockUseGetUserCards.mockReturnValue({ data: [1, 2, 3, 4, 5] });

      renderUserCardsCarousel();

      expect(screen.getByTestId('nav-button-left')).toBeDisabled();
      expect(screen.getByTestId('nav-button-right')).toBeEnabled();
    });

    it('should navigate to next slide when right button clicked', async () => {
      mockUseGetUserCards.mockReturnValue({ data: [1, 2, 3, 4, 5] });

      renderUserCardsCarousel();

      await userEvent.click(screen.getByTestId('nav-button-right'));

      const track = screen.getByTestId('cards-track');
      expect(track).toHaveAttribute('data-translate-x', '315');
    });

    it('should navigate to previous slide when left button clicked', async () => {
      mockUseGetUserCards.mockReturnValue({ data: [1, 2, 3, 4, 5] });

      renderUserCardsCarousel();

      await userEvent.click(screen.getByTestId('nav-button-right'));
      await userEvent.click(screen.getByTestId('nav-button-left'));

      const track = screen.getByTestId('cards-track');
      expect(track).toHaveAttribute('data-translate-x', '0');
    });

    it('should disable right button at maximum index', async () => {
      mockUseGetUserCards.mockReturnValue({ data: [1, 2, 3, 4] });

      renderUserCardsCarousel();

      await userEvent.click(screen.getByTestId('nav-button-right'));

      expect(screen.getByTestId('nav-button-right')).toBeDisabled();
      expect(screen.getByTestId('nav-button-left')).toBeEnabled();
    });
  });

  describe('Pagination', () => {
    it('should render correct number of pagination indicators', () => {
      mockUseGetUserCards.mockReturnValue({ data: [1, 2, 3, 4, 5, 6, 7] });

      renderUserCardsCarousel();

      expect(screen.getAllByTestId('pagination-indicator')).toHaveLength(3);
    });

    it('should highlight first indicator initially', () => {
      mockUseGetUserCards.mockReturnValue({ data: [1, 2, 3, 4, 5] });

      renderUserCardsCarousel();

      const indicators = screen.getAllByTestId('pagination-indicator');
      expect(indicators[0]).toHaveAttribute('data-active', 'true');
      expect(indicators[1]).toHaveAttribute('data-active', 'false');
    });

    it('should navigate to page when pagination indicator clicked', async () => {
      mockUseGetUserCards.mockReturnValue({ data: [1, 2, 3, 4, 5, 6, 7] });

      renderUserCardsCarousel();

      const indicators = screen.getAllByTestId('pagination-indicator');
      await userEvent.click(indicators[1]);

      expect(indicators[1]).toHaveAttribute('data-active', 'true');
      expect(indicators[0]).toHaveAttribute('data-active', 'false');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty cards array', () => {
      mockUseGetUserCards.mockReturnValue({ data: [] });

      renderUserCardsCarousel();

      expect(screen.getByTestId('nav-button-left')).toBeDisabled();
      expect(screen.getByTestId('nav-button-right')).toBeDisabled();
      expect(
        screen.queryByTestId('pagination-indicator'),
      ).not.toBeInTheDocument();
    });

    it('should handle single card', () => {
      mockUseGetUserCards.mockReturnValue({ data: [1] });

      renderUserCardsCarousel();

      expect(screen.getByTestId('nav-button-left')).toBeDisabled();
      expect(screen.getByTestId('nav-button-right')).toBeDisabled();
      expect(screen.getAllByTestId('pagination-indicator')).toHaveLength(1);
    });

    it('should handle exactly 3 cards (one page)', () => {
      mockUseGetUserCards.mockReturnValue({ data: [1, 2, 3] });

      renderUserCardsCarousel();

      expect(screen.getByTestId('nav-button-left')).toBeDisabled();
      expect(screen.getByTestId('nav-button-right')).toBeDisabled();
      expect(screen.getAllByTestId('pagination-indicator')).toHaveLength(1);
    });
  });
});
