import { render, screen, fireEvent } from '@testing-library/react';

import { UserBankCardsCarousel } from './UserBankCardsCarousel';

const createCards = (count: number) =>
  Array.from({ length: count }, (_, i) => (
    <div key={i} data-testid={`card-${i}`}>
      Card {i + 1}
    </div>
  ));

describe('UserBankCardsCarousel', () => {
  describe('Rendering', () => {
    it('renders carousel with children', () => {
      const cards = createCards(2);
      render(<UserBankCardsCarousel>{cards}</UserBankCardsCarousel>);

      expect(screen.getByTestId('cards-carousel')).toBeInTheDocument();
      expect(screen.getByTestId('card-0')).toBeInTheDocument();
      expect(screen.getByTestId('card-1')).toBeInTheDocument();
    });
  });

  describe('Navigation buttons', () => {
    it('disables prev button at start', () => {
      const cards = createCards(5);
      render(<UserBankCardsCarousel>{cards}</UserBankCardsCarousel>);

      expect(screen.getByTestId('nav-button-left')).toBeDisabled();
    });

    it('enables next button when there are more cards', () => {
      const cards = createCards(5);
      render(<UserBankCardsCarousel>{cards}</UserBankCardsCarousel>);

      expect(screen.getByTestId('nav-button-right')).toBeEnabled();
    });

    it('navigates to next slide', () => {
      const cards = createCards(5);
      render(<UserBankCardsCarousel>{cards}</UserBankCardsCarousel>);

      fireEvent.click(screen.getByTestId('nav-button-right'));

      expect(screen.getByTestId('nav-button-left')).toBeEnabled();
    });

    it('navigates to previous slide', () => {
      const cards = createCards(5);
      render(<UserBankCardsCarousel>{cards}</UserBankCardsCarousel>);

      fireEvent.click(screen.getByTestId('nav-button-right'));
      fireEvent.click(screen.getByTestId('nav-button-left'));

      expect(screen.getByTestId('nav-button-left')).toBeDisabled();
    });

    it('disables next button at end', () => {
      const cards = createCards(4);
      render(<UserBankCardsCarousel>{cards}</UserBankCardsCarousel>);

      fireEvent.click(screen.getByTestId('nav-button-right'));

      expect(screen.getByTestId('nav-button-right')).toBeDisabled();
    });
  });

  describe('Pagination', () => {
    it('shows pagination for multiple pages', () => {
      const cards = createCards(5);
      render(<UserBankCardsCarousel>{cards}</UserBankCardsCarousel>);

      expect(screen.getByTestId('pagination-container')).toBeInTheDocument();
      expect(screen.getAllByTestId('pagination-indicator')).toHaveLength(2);
    });

    it('hides pagination for single page', () => {
      const cards = createCards(2);
      render(<UserBankCardsCarousel>{cards}</UserBankCardsCarousel>);

      expect(
        screen.queryByTestId('pagination-container'),
      ).not.toBeInTheDocument();
    });

    it('navigates via pagination', () => {
      const cards = createCards(5);
      render(<UserBankCardsCarousel>{cards}</UserBankCardsCarousel>);

      const indicators = screen.getAllByTestId('pagination-indicator');
      fireEvent.click(indicators[1]);

      expect(screen.getByTestId('nav-button-left')).toBeEnabled();
    });
  });
});
