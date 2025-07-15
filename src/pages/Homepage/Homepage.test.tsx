import { render, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';

import { HomePage } from './Homepage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

jest.mock('components/organisms', () => ({
  OffersCarousel: () => <div data-testid="offers-carousel">Offers</div>,
  CurrencyExchange: () => <div data-testid="currency-exchange">Exchange</div>,
}));

jest.mock('pages/AllCardsPage/AllCardsPage', () => ({
  AllCardsPage: () => <div data-testid="all-cards-page">Cards Page</div>,
}));

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('when "view" query param is not "cards"', () => {
    it('renders OffersCarousel and CurrencyExchange', () => {
      (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams('')]);

      render(<HomePage />);

      expect(screen.getByTestId('offers-carousel')).toBeInTheDocument();
      expect(screen.getByTestId('currency-exchange')).toBeInTheDocument();
      expect(screen.queryByTestId('all-cards-page')).not.toBeInTheDocument();
    });
  });

  describe('when "view=cards" query param is present', () => {
    it('renders AllCardsPage only', () => {
      (useSearchParams as jest.Mock).mockReturnValue([
        new URLSearchParams('view=cards'),
      ]);

      render(<HomePage />);

      expect(screen.getByTestId('all-cards-page')).toBeInTheDocument();
      expect(screen.queryByTestId('offers-carousel')).not.toBeInTheDocument();
      expect(screen.queryByTestId('currency-exchange')).not.toBeInTheDocument();
    });
  });
});
