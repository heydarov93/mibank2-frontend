import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { TUserBankCardDetails } from '../InfoTab/InfoTab';

import ButtonGroup from './ButtonGroup';

import * as userCardsApi from 'api/userCardsApi';

jest.mock('api/userCardsApi');
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));
jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const mockNavigate = jest.fn();
const mockUpdateStatus = jest.fn();
const mockUpdatePrimary = jest.fn();
const mockReset = jest.fn();
const mockedUserCardsApi = userCardsApi as jest.Mocked<typeof userCardsApi>;

const mockCard: TUserBankCardDetails = {
  id: 'card-123',
  holder: 'John Doe',
  number: 1234567890123456,
  cvv: 123,
  iban: 'GB82WEST12345698765432',
  swift: 'WESTGB2L',
  issueDate: '2023.01.15',
  cashbackRate: 1.5,
  status: 'active',
  isPrimary: false,
};

describe('ButtonGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUserCardsApi.useUpdateUserCardStatusMutation.mockReturnValue([
      mockUpdateStatus,
      { isLoading: false, isError: false, reset: mockReset },
    ]);

    mockedUserCardsApi.useUpdatePrimaryPaymentCardMutation.mockReturnValue([
      mockUpdatePrimary,
      { isLoading: false, isError: false, reset: mockReset },
    ]);
  });

  describe('Rendering', () => {
    it('renders all buttons for non-primary card', () => {
      render(<ButtonGroup selectedUserCardDetails={mockCard} />);

      expect(screen.getByTestId('transfer-button')).toBeInTheDocument();
      expect(screen.getByTestId('primary-button')).toBeInTheDocument();
      expect(screen.getByTestId('status-button')).toBeInTheDocument();
    });

    it('hides primary button for primary cards', () => {
      const primaryCard = { ...mockCard, isPrimary: true };
      render(<ButtonGroup selectedUserCardDetails={primaryCard} />);

      expect(screen.queryByTestId('primary-button')).not.toBeInTheDocument();
    });

    it('shows correct button text for active card', () => {
      render(<ButtonGroup selectedUserCardDetails={mockCard} />);

      expect(screen.getByTestId('status-button')).toHaveTextContent(
        'blockButton',
      );
    });

    it('shows correct button text for blocked card', () => {
      const blockedCard = { ...mockCard, status: 'blocked' as const };
      render(<ButtonGroup selectedUserCardDetails={blockedCard} />);

      expect(screen.getByTestId('status-button')).toHaveTextContent(
        'unblockButton',
      );
    });
  });

  describe('Navigation', () => {
    it('navigates to transfers on transfer button click', () => {
      render(<ButtonGroup selectedUserCardDetails={mockCard} />);

      fireEvent.click(screen.getByTestId('transfer-button'));

      expect(mockNavigate).toHaveBeenCalledWith('/transfers');
    });
  });

  describe('Card status management', () => {
    it('updates card status when status button is clicked', async () => {
      mockUpdateStatus.mockResolvedValue({ unwrap: () => Promise.resolve() });
      render(<ButtonGroup selectedUserCardDetails={mockCard} />);

      fireEvent.click(screen.getByTestId('status-button'));

      await waitFor(() => {
        expect(mockUpdateStatus).toHaveBeenCalledWith({
          id: 'card-123',
          status: 'BLOCKED',
        });
      });
    });

    it('sets card as primary when primary button is clicked', async () => {
      mockUpdatePrimary.mockResolvedValue({ unwrap: () => Promise.resolve() });
      render(<ButtonGroup selectedUserCardDetails={mockCard} />);

      fireEvent.click(screen.getByTestId('primary-button'));

      await waitFor(() => {
        expect(mockUpdatePrimary).toHaveBeenCalledWith({
          id: 'card-123',
          isPrimaryPaymentCard: true,
        });
      });
    });
  });

  describe('Button states', () => {
    it('disables primary button for blocked cards', () => {
      const blockedCard = { ...mockCard, status: 'blocked' as const };
      render(<ButtonGroup selectedUserCardDetails={blockedCard} />);

      expect(screen.getByTestId('primary-button')).toBeDisabled();
    });

    it('disables buttons during loading states', () => {
      mockedUserCardsApi.useUpdateUserCardStatusMutation.mockReturnValue([
        mockUpdateStatus,
        { isLoading: true, isError: false, reset: mockReset },
      ]);
      mockedUserCardsApi.useUpdatePrimaryPaymentCardMutation.mockReturnValue([
        mockUpdatePrimary,
        { isLoading: true, isError: false, reset: mockReset },
      ]);

      render(<ButtonGroup selectedUserCardDetails={mockCard} />);

      expect(screen.getByTestId('status-button')).toBeDisabled();
      expect(screen.getByTestId('primary-button')).toBeDisabled();
    });
  });

  describe('Error handling', () => {
    it('shows error alert on status update failure', async () => {
      const rejectedMock = jest.fn().mockReturnValue({
        unwrap: () => Promise.reject(new Error('API Error')),
      });
      mockedUserCardsApi.useUpdateUserCardStatusMutation.mockReturnValue([
        rejectedMock,
        { isLoading: false, isError: true, reset: mockReset },
      ]);

      render(<ButtonGroup selectedUserCardDetails={mockCard} />);
      fireEvent.click(screen.getByTestId('status-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-alert')).toBeInTheDocument();
      });
    });

    it('shows error alert on primary update failure', async () => {
      const rejectedMock = jest.fn().mockReturnValue({
        unwrap: () => Promise.reject(new Error('API Error')),
      });
      mockedUserCardsApi.useUpdatePrimaryPaymentCardMutation.mockReturnValue([
        rejectedMock,
        { isLoading: false, isError: true, reset: mockReset },
      ]);

      render(<ButtonGroup selectedUserCardDetails={mockCard} />);
      fireEvent.click(screen.getByTestId('primary-button'));

      await waitFor(() => {
        expect(screen.getByTestId('error-alert')).toBeInTheDocument();
      });
    });
  });
});
