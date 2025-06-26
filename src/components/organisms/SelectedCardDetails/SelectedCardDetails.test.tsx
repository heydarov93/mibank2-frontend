import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SelectedCardDetails } from './SelectedCardDetails';

import { IUserBankCard } from 'models/IUserBankCard';
import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('enums/ECardInfoTab', () => ({
  ECardInfoTab: {
    Transactions: 'transactions',
    Information: 'information',
    Settings: 'settings',
  },
}));

jest.mock('./molecules/ButtonGroup.tsx', () => {
  return function ButtonGroup() {
    return (
      <div data-testid="button-group">
        <button>Transfer</button>
        <button>Put on Top</button>
        <button>Block card</button>
      </div>
    );
  };
});

jest.mock('./molecules/InfoTabs', () => {
  return function InfoTabs({
    activeTab,
    onTabChange,
  }: {
    activeTab: string;
    onTabChange: (e: any, value: string) => void;
  }) {
    return (
      <div data-testid="info-tabs">
        <button
          data-testid="tab-transactions"
          onClick={(e) => onTabChange(e, 'transactions')}
          aria-selected={activeTab === 'transactions'}
        >
          Transactions
        </button>
        <button
          data-testid="tab-information"
          onClick={(e) => onTabChange(e, 'information')}
          aria-selected={activeTab === 'information'}
        >
          Information
        </button>
        <button
          data-testid="tab-settings"
          onClick={(e) => onTabChange(e, 'settings')}
          aria-selected={activeTab === 'settings'}
        >
          Settings
        </button>
      </div>
    );
  };
});

jest.mock('./molecules/InfoTab', () => {
  return function InfoTab({ selectedCard }: { selectedCard: IUserBankCard }) {
    return (
      <div data-testid="info-tab">Card Info for: {selectedCard.holder}</div>
    );
  };
});

const renderSelectedCardDetails = (selectedCard: IUserBankCard) => {
  return render(
    <ThemeProvider theme={theme}>
      <SelectedCardDetails selectedCard={selectedCard} />
    </ThemeProvider>,
  );
};

describe('SelectedCardDetails', () => {
  const mockCard: IUserBankCard = {
    id: 1,
    name: 'Test Card',
    number: 1234567890123456,
    balance: 1000,
    currency: 'USD',
    issuer: 'visa',
    expirationDate: '12/25',
    type: 'plastic',
    status: 'active',
    holder: 'John Doe',
    cvv: 123,
    iban: 'US12345678901234567890',
    swift: 'TESTBANK',
    issueDate: '01.01.2023',
    cashbackRate: 1.5,
  };

  describe('Basic rendering', () => {
    it('should render main structure with header and tabs', () => {
      renderSelectedCardDetails(mockCard);

      expect(screen.getByTestId('container')).toBeInTheDocument();
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('title')).toBeInTheDocument();
      expect(screen.getByTestId('button-group')).toBeInTheDocument();
      expect(screen.getByTestId('info-tabs')).toBeInTheDocument();
    });

    it('should display translated title', () => {
      renderSelectedCardDetails(mockCard);

      expect(screen.getByTestId('title')).toHaveTextContent('title');
    });

    it('should render InfoTab by default', () => {
      renderSelectedCardDetails(mockCard);

      expect(screen.getByTestId('info-tab')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Information' }),
      ).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Tab navigation', () => {
    it('should start with Information tab active', () => {
      renderSelectedCardDetails(mockCard);

      const informationTab = screen.getByRole('button', {
        name: 'Information',
      });
      expect(informationTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByTestId('info-tab')).toBeInTheDocument();
    });

    it('should hide InfoTab when switching to Transactions tab', async () => {
      renderSelectedCardDetails(mockCard);

      await userEvent.click(
        screen.getByRole('button', { name: 'Transactions' }),
      );

      expect(
        screen.getByRole('button', { name: 'Transactions' }),
      ).toHaveAttribute('aria-selected', 'true');
      expect(screen.queryByTestId('info-tab')).not.toBeInTheDocument();
    });

    it('should hide InfoTab when switching to Settings tab', async () => {
      renderSelectedCardDetails(mockCard);

      await userEvent.click(screen.getByRole('button', { name: 'Settings' }));

      expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(screen.queryByTestId('info-tab')).not.toBeInTheDocument();
    });

    it('should show InfoTab again when returning to Information tab', async () => {
      renderSelectedCardDetails(mockCard);

      await userEvent.click(
        screen.getByRole('button', { name: 'Transactions' }),
      );
      expect(screen.queryByTestId('info-tab')).not.toBeInTheDocument();

      await userEvent.click(
        screen.getByRole('button', { name: 'Information' }),
      );
      expect(screen.getByTestId('info-tab')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Information' }),
      ).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Card data integration', () => {
    it('should pass selected card to InfoTab component', () => {
      renderSelectedCardDetails(mockCard);

      expect(screen.getByText('Card Info for: John Doe')).toBeInTheDocument();
    });

    it('should handle different card data', () => {
      const differentCard = { ...mockCard, holder: 'Jane Smith' };
      renderSelectedCardDetails(differentCard);

      expect(screen.getByText('Card Info for: Jane Smith')).toBeInTheDocument();
    });
  });

  describe('Component integration', () => {
    it('should pass correct props to InfoTabs', () => {
      renderSelectedCardDetails(mockCard);

      expect(
        screen.getByRole('button', { name: 'Information' }),
      ).toHaveAttribute('aria-selected', 'true');
      expect(
        screen.getByRole('button', { name: 'Transactions' }),
      ).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute(
        'aria-selected',
        'false',
      );
    });

    it('should handle tab changes correctly', async () => {
      renderSelectedCardDetails(mockCard);

      await userEvent.click(screen.getByRole('button', { name: 'Settings' }));
      expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute(
        'aria-selected',
        'true',
      );

      await userEvent.click(
        screen.getByRole('button', { name: 'Transactions' }),
      );
      expect(
        screen.getByRole('button', { name: 'Transactions' }),
      ).toHaveAttribute('aria-selected', 'true');

      await userEvent.click(
        screen.getByRole('button', { name: 'Information' }),
      );
      expect(
        screen.getByRole('button', { name: 'Information' }),
      ).toHaveAttribute('aria-selected', 'true');
    });
  });
});
