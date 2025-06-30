import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { TransferMethodMenu } from './TransferMethodMenu';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => `translated_${key}`,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('pages/TransfersPage/TransfersPage', () => ({
  transferMethods: {
    BANK: 'bank',
    CARD: 'card',
    WALLET: 'wallet',
  },
}));

const mockSetSearchParams = jest.fn();
const mockGet = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [{ get: mockGet }, mockSetSearchParams],
}));

const renderComponent = (initialMethod?: string) => {
  mockGet.mockReturnValue(initialMethod || 'bank');

  return render(
    <BrowserRouter>
      <TransferMethodMenu />
    </BrowserRouter>,
  );
};

describe('TransferMethodMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Button display', () => {
    it('renders transfer method button with current method', () => {
      renderComponent('card');

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('translated_card');
    });

    it('shows dropdown arrow icon', () => {
      renderComponent();

      const button = screen.getByRole('button');
      expect(button.querySelector('svg')).toBeInTheDocument();
    });

    it('displays default method when no method in URL', () => {
      mockGet.mockReturnValue(null);
      renderComponent();

      expect(screen.getByRole('button')).toHaveTextContent('translated_bank');
    });
  });

  describe('Menu interactions', () => {
    it('does not show menu by default', () => {
      renderComponent();

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('opens menu when button is clicked', () => {
      renderComponent();

      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('shows all transfer method options in menu', () => {
      renderComponent();

      fireEvent.click(screen.getByRole('button'));

      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(3);
      expect(menuItems[0]).toHaveTextContent('translated_bank');
      expect(menuItems[1]).toHaveTextContent('translated_card');
      expect(menuItems[2]).toHaveTextContent('translated_wallet');
    });

    it('closes menu when menu loses focus', () => {
      renderComponent();

      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Method selection', () => {
    it('updates URL when method is selected', () => {
      renderComponent();

      fireEvent.click(screen.getByRole('button'));

      const menuItems = screen.getAllByRole('menuitem');
      const walletMenuItem = menuItems.find(
        (item) => item.textContent === 'translated_wallet',
      );
      fireEvent.click(walletMenuItem!);

      expect(mockSetSearchParams).toHaveBeenCalledWith({ method: 'wallet' });
    });

    it('closes menu after selecting method', () => {
      renderComponent();

      fireEvent.click(screen.getByRole('button'));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      const menuItems = screen.getAllByRole('menuitem');
      const cardMenuItem = menuItems.find(
        (item) => item.textContent === 'translated_card',
      );
      fireEvent.click(cardMenuItem!);

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('updates button text when different method is selected', () => {
      renderComponent('bank');

      fireEvent.click(screen.getByRole('button'));

      const menuItems = screen.getAllByRole('menuitem');
      const cardMenuItem = menuItems.find(
        (item) => item.textContent === 'translated_card',
      );
      fireEvent.click(cardMenuItem!);

      expect(mockSetSearchParams).toHaveBeenCalledWith({ method: 'card' });
    });
  });

  describe('Different initial states', () => {
    it('shows correct method when wallet is initially selected', () => {
      renderComponent('wallet');

      expect(screen.getByRole('button')).toHaveTextContent('translated_wallet');
    });

    it('shows correct method when bank is initially selected', () => {
      renderComponent('bank');

      expect(screen.getByRole('button')).toHaveTextContent('translated_bank');
    });
  });
});
