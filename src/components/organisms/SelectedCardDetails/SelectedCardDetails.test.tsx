import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CardData, SelectedCardDetails } from './SelectedCardDetails';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('./molecules/ButtonGroup.tsx', () => {
  return function ButtonGroup() {
    return (
      <div data-testid="button-group">
        <button>Transfer</button>
        <button>Put on top</button>
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
    const ECardInfoTab = {
      Transactions: 'transactions',
      Information: 'information',
      Settings: 'settings',
    };

    return (
      <div data-testid="info-tabs">
        <button
          data-testid="tab-transactions"
          onClick={(e) => onTabChange(e, ECardInfoTab.Transactions)}
          aria-selected={activeTab === ECardInfoTab.Transactions}
        >
          Transactions
        </button>
        <button
          data-testid="tab-information"
          onClick={(e) => onTabChange(e, ECardInfoTab.Information)}
          aria-selected={activeTab === ECardInfoTab.Information}
        >
          Information
        </button>
        <button
          data-testid="tab-settings"
          onClick={(e) => onTabChange(e, ECardInfoTab.Settings)}
          aria-selected={activeTab === ECardInfoTab.Settings}
        >
          Settings
        </button>
      </div>
    );
  };
});

jest.mock('./molecules/InfoTab', () => {
  return function InfoTab({ cardData }: { cardData: CardData }) {
    return (
      <div data-testid="info-tab">
        <div>Status: {cardData.status}</div>
        <div>Card Holder: {cardData.cardHolder}</div>
        <div>Card Number: {cardData.cardNumber}</div>
        <div>Card Cvv: {cardData.cvv}</div>
        <div>Iban: {cardData.iban}</div>
        <div>Swift/Bic: {cardData.swiftBic}</div>
        <div>Date: {cardData.issueDate}</div>
        <div>Cashback Rate: {cardData.cashbackRate}</div>
      </div>
    );
  };
});

const renderComponent = (props: { cardDetails?: CardData } = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <SelectedCardDetails {...props} />
    </ThemeProvider>,
  );
};

const mockCardData: CardData = {
  status: 'Active',
  cardHolder: 'Jane Smith',
  cardNumber: '•••• 9876',
  cvv: '•••',
  iban: 'GB29 NWBK 6016 1331 9268 19',
  swiftBic: 'NWBKGB2L',
  issueDate: '15.06.2023',
  cashbackRate: '2.5%',
};

describe('SelectedCardDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render the main structure', () => {
      renderComponent();

      expect(screen.getByTestId('container')).toBeInTheDocument();
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('title')).toBeInTheDocument();
      expect(screen.getByTestId('button-group')).toBeInTheDocument();
      expect(screen.getByTestId('info-tabs')).toBeInTheDocument();
    });

    it('should display translated title', () => {
      renderComponent();

      expect(screen.getByTestId('title')).toHaveTextContent('title');
    });

    it('should render InfoTab by default (Information tab active)', () => {
      renderComponent();

      expect(screen.getByTestId('info-tab')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Information' }),
      ).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Data handling', () => {
    it('should use provided card data', () => {
      renderComponent({ cardDetails: mockCardData });

      expect(screen.getByText('Card Holder: Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Status: Active')).toBeInTheDocument();
    });

    it('should fallback to mock data when no cardDetails provided', () => {
      renderComponent();

      expect(
        screen.getByText('Card Holder: Grzegorz Brzeczyszczykiewicz'),
      ).toBeInTheDocument();
      expect(screen.getByText('Status: Active')).toBeInTheDocument();
    });

    it('should handle undefined cardDetails gracefully', () => {
      renderComponent({ cardDetails: undefined });

      expect(screen.getByTestId('info-tab')).toBeInTheDocument();
      expect(
        screen.getByText('Card Holder: Grzegorz Brzeczyszczykiewicz'),
      ).toBeInTheDocument();
    });
  });

  describe('Tab navigation', () => {
    it('should start with Information tab active', () => {
      renderComponent();

      const informationTab = screen.getByRole('button', {
        name: 'Information',
      });
      expect(informationTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByTestId('info-tab')).toBeInTheDocument();
    });

    it('should hide InfoTab when switching to Transactions tab', async () => {
      renderComponent();

      await userEvent.click(
        screen.getByRole('button', { name: 'Transactions' }),
      );

      expect(
        screen.getByRole('button', { name: 'Transactions' }),
      ).toHaveAttribute('aria-selected', 'true');
      expect(screen.queryByTestId('info-tab')).not.toBeInTheDocument();
    });

    it('should hide InfoTab when switching to Settings tab', async () => {
      renderComponent();

      await userEvent.click(screen.getByRole('button', { name: 'Settings' }));

      expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(screen.queryByTestId('info-tab')).not.toBeInTheDocument();
    });

    it('should show InfoTab again when returning to Information tab', async () => {
      renderComponent();

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

    it('should maintain state across tab changes', async () => {
      renderComponent({ cardDetails: mockCardData });

      expect(screen.getByText('Card Holder: Jane Smith')).toBeInTheDocument();

      await userEvent.click(
        screen.getByRole('button', { name: 'Transactions' }),
      );
      expect(screen.queryByTestId('info-tab')).not.toBeInTheDocument();

      await userEvent.click(
        screen.getByRole('button', { name: 'Information' }),
      );

      expect(screen.getByText('Card Holder: Jane Smith')).toBeInTheDocument();
    });
  });

  describe('Component integration', () => {
    it('should pass correct props to InfoTabs', () => {
      renderComponent();

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

    it('should pass card data to InfoTab component', () => {
      renderComponent({ cardDetails: mockCardData });

      expect(screen.getByText('Card Holder: Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Status: Active')).toBeInTheDocument();
    });

    it('should handle tab change events properly', async () => {
      renderComponent();

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

  describe('Error boundaries', () => {
    it('should not crash with empty card data', () => {
      const emptyCardData = {
        status: '',
        cardHolder: '',
        cardNumber: '',
        cvv: '',
        iban: '',
        swiftBic: '',
        issueDate: '',
        cashbackRate: '',
      };

      expect(() => {
        renderComponent({ cardDetails: emptyCardData });
      }).not.toThrow();

      expect(screen.getByTestId('info-tab')).toBeInTheDocument();
    });
  });
});
