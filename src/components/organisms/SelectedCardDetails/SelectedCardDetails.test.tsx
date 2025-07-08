import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';

import { useGetUserCardDetails } from '../Sidebar/organisms/MyCards/hooks/useGetUserCardDetails';

import { SelectedCardDetails } from './SelectedCardDetails';

import { theme } from 'theme/theme';

jest.mock('api/services/card-service/cards.api');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: {
    type: '3rdParty',
  },
}));
jest.mock('enums/ECardInfoTab', () => ({
  ECardInfoTab: {
    Information: 'information',
    Transactions: 'transactions',
    Settings: 'settings',
  },
}));
jest.mock('./molecules/ButtonGroup/ButtonGroup', () => {
  return function ButtonGroup({ selectedUserCardDetails }: any) {
    return (
      <div data-testid="button-group">
        Card ID: {selectedUserCardDetails.id}
      </div>
    );
  };
});
jest.mock('./molecules/InfoTab/InfoTab', () => {
  return function InfoTab({ selectedUserCardDetails }: any) {
    return (
      <div data-testid="info-tab">
        Info for: {selectedUserCardDetails.holder}
      </div>
    );
  };
});
jest.mock('./molecules/InfoTabs/InfoTabs', () => {
  return function InfoTabs({ activeTab, onTabChange }: any) {
    return (
      <div data-testid="info-tabs">
        <button
          data-testid="tab-information"
          onClick={(e) => onTabChange(e, 'information')}
          data-active={activeTab === 'information'}
        >
          Information
        </button>
        <button
          data-testid="tab-transactions"
          onClick={(e) => onTabChange(e, 'transactions')}
          data-active={activeTab === 'transactions'}
        >
          Transactions
        </button>
      </div>
    );
  };
});

const renderWithTheme = () => {
  render(
    <ThemeProvider theme={theme}>
      <SelectedCardDetails selectedCardId="card-123" />
    </ThemeProvider>,
  );
};

jest.mock('../Sidebar/organisms/MyCards/hooks/useGetUserCardDetails', () => ({
  useGetUserCardDetails: jest.fn(),
}));
const mockedUseGetUserCardDetails = useGetUserCardDetails as jest.Mock;

const mockCardDetailsResponse = {
  id: 'card-123',
  holder: 'John Doe',
  number: '1234567890123456',
  issueDate: '2023-01-15',
  cashbackRate: 1.5,
  status: 'ACTIVE',
  isPrimary: false,
  cvv: '123',
  ibanNumber: 'GB82WEST12345698765432',
  swiftNumber: 'WESTGB2L',
};

const mockPrimaryCardResponse = {
  ...mockCardDetailsResponse,
  isPrimary: true,
};

describe('SelectedCardDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Loading state', () => {
    it('shows loading spinner while fetching card details', () => {
      mockedUseGetUserCardDetails.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
      } as any);

      renderWithTheme();

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
  });

  describe('Error states', () => {
    it('shows error alert when API call fails', () => {
      mockedUseGetUserCardDetails.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
      } as any);

      renderWithTheme();

      expect(screen.getByTestId('error-alert')).toBeInTheDocument();
      expect(
        screen.getByText('errors.failedToLoadCardDetails'),
      ).toBeInTheDocument();
    });

    it('shows no data alert when card details not found', () => {
      mockedUseGetUserCardDetails.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
      } as any);

      renderWithTheme();

      expect(screen.getByTestId('no-data-alert')).toBeInTheDocument();
      expect(
        screen.getByText('errors.notFoundCardDetails'),
      ).toBeInTheDocument();
    });
  });

  describe('Successful data display', () => {
    beforeEach(() => {
      mockedUseGetUserCardDetails.mockReturnValue({
        data: mockCardDetailsResponse,
        isLoading: false,
        isError: false,
      } as any);
    });

    it('renders main container with header and title', () => {
      renderWithTheme();

      expect(screen.getByTestId('container')).toBeInTheDocument();
      expect(screen.getByTestId('header')).toBeInTheDocument();
      expect(screen.getByTestId('title')).toHaveTextContent('title');
    });

    it('renders button group with card details', () => {
      renderWithTheme();

      expect(screen.getByTestId('button-group')).toBeInTheDocument();
      expect(screen.getByText('Card ID: card-123')).toBeInTheDocument();
    });

    it('renders info tabs', () => {
      renderWithTheme();

      expect(screen.getByTestId('info-tabs')).toBeInTheDocument();
    });

    it('shows info tab by default', () => {
      renderWithTheme();

      expect(screen.getByTestId('info-tab')).toBeInTheDocument();
      expect(screen.getByText('Info for: John Doe')).toBeInTheDocument();
    });

    it('does not show primary card label for non-primary cards', () => {
      renderWithTheme();

      expect(screen.queryByText(/primaryCardLabel/)).not.toBeInTheDocument();
    });
  });

  describe('Primary card display', () => {
    it('shows primary card label for primary cards', () => {
      mockedUseGetUserCardDetails.mockReturnValue({
        data: mockPrimaryCardResponse,
        isLoading: false,
        isError: false,
      } as any);

      renderWithTheme();

      expect(screen.getByText(/primaryCardLabel/)).toBeInTheDocument();
    });
  });

  describe('Tab navigation', () => {
    beforeEach(() => {
      mockedUseGetUserCardDetails.mockReturnValue({
        data: mockCardDetailsResponse,
        isLoading: false,
        isError: false,
      } as any);
    });

    it('starts with information tab active and info tab visible', () => {
      renderWithTheme();

      expect(screen.getByTestId('tab-information')).toHaveAttribute(
        'data-active',
        'true',
      );
      expect(screen.getByTestId('info-tab')).toBeInTheDocument();
    });

    it('hides info tab when switching to transactions tab', () => {
      renderWithTheme();

      fireEvent.click(screen.getByTestId('tab-transactions'));

      expect(screen.getByTestId('tab-transactions')).toHaveAttribute(
        'data-active',
        'true',
      );
      expect(screen.queryByTestId('info-tab')).not.toBeInTheDocument();
    });

    it('shows info tab again when switching back to information tab', () => {
      renderWithTheme();

      fireEvent.click(screen.getByTestId('tab-transactions'));
      expect(screen.queryByTestId('info-tab')).not.toBeInTheDocument();

      fireEvent.click(screen.getByTestId('tab-information'));
      expect(screen.getByTestId('info-tab')).toBeInTheDocument();
    });
  });
});
