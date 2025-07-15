import { ThemeProvider } from '@mui/material';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import { TransfersPage, TTransferMethod } from './TransfersPage';

import { theme } from 'theme/theme';

interface NavigationWarningModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        goBack: 'Go Back',
        'warningModal.title': 'Warning',
        'warningModal.description': 'Are you sure you want to go back?',
      };
      return translations[key] || key;
    },
    initReactI18next: {
      type: '3rdParty',
    },
  }),
}));

jest.mock('components/atoms', () => ({
  NavigationWarningModal: ({
    open,
    onConfirm,
    onCancel,
    title,
    description,
  }: NavigationWarningModalProps) =>
    open ? (
      <div data-testid="warning-modal">
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={onConfirm} data-testid="confirm-button">
          Confirm
        </button>
        <button onClick={onCancel} data-testid="cancel-button">
          Cancel
        </button>
      </div>
    ) : null,
}));

jest.mock('components/organisms', () => ({
  SelectView: () => <div data-testid="select-view">Select Transfer Method</div>,
  TransferView: ({
    transferMethod,
    onCancel,
  }: {
    transferMethod: TTransferMethod;
    onCancel: () => void;
  }) => (
    <div data-testid="transfer-view">
      <p>Transfer Method: {transferMethod}</p>
      <button onClick={onCancel} data-testid="cancel-transfer">
        Cancel
      </button>
    </div>
  ),
}));

const renderPage = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <TransfersPage />
      </ThemeProvider>
    </BrowserRouter>,
  );
};

const renderWithSearchParams = (searchParams: string) => {
  window.history.pushState({}, '', `/?${searchParams}`);
  return renderPage();
};

describe('TransfersPage', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  describe('Rendering', () => {
    it('renders SelectView when no transfer method is specified', () => {
      renderPage();

      expect(screen.getByTestId('select-view')).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /go back/i }),
      ).not.toBeInTheDocument();
    });

    it('does not show warning modal initially', () => {
      renderPage();

      expect(screen.queryByTestId('warning-modal')).not.toBeInTheDocument();
    });
  });

  describe('Transfer Method Views', () => {
    it('renders TransferView when valid transfer method is provided', () => {
      renderWithSearchParams('method=iban');

      expect(screen.getByTestId('transfer-view')).toBeInTheDocument();
      expect(screen.getByText('Transfer Method: iban')).toBeInTheDocument();
      expect(screen.queryByTestId('select-view')).not.toBeInTheDocument();
    });

    it('shows go back button when transfer method is active', () => {
      renderWithSearchParams('method=card');

      expect(
        screen.getByRole('button', { name: /go back/i }),
      ).toBeInTheDocument();
    });

    it('renders SelectView when invalid transfer method is provided', () => {
      renderWithSearchParams('method=invalid');

      expect(screen.getByTestId('select-view')).toBeInTheDocument();
      expect(screen.queryByTestId('transfer-view')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: /go back/i }),
      ).not.toBeInTheDocument();
    });

    it('handles all valid transfer methods', () => {
      const validMethods = ['iban', 'card', 'owncards'];

      validMethods.forEach((method) => {
        const { unmount } = renderWithSearchParams(`method=${method}`);

        expect(screen.getByTestId('transfer-view')).toBeInTheDocument();
        expect(
          screen.getByText(`Transfer Method: ${method}`),
        ).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe('Navigation Warning Modal', () => {
    it('opens warning modal when go back button is clicked', async () => {
      renderWithSearchParams('method=iban');

      const goBackButton = screen.getByRole('button', { name: /go back/i });
      await userEvent.click(goBackButton);

      expect(screen.getByTestId('warning-modal')).toBeInTheDocument();
      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(
        screen.getByText('Are you sure you want to go back?'),
      ).toBeInTheDocument();
    });

    it('opens warning modal when cancel is clicked from TransferView', async () => {
      renderWithSearchParams('method=card');

      const cancelButton = screen.getByTestId('cancel-transfer');
      await userEvent.click(cancelButton);

      expect(screen.getByTestId('warning-modal')).toBeInTheDocument();
    });

    it('closes modal when cancel is clicked in modal', async () => {
      renderWithSearchParams('method=iban');

      const goBackButton = screen.getByRole('button', { name: /go back/i });
      await userEvent.click(goBackButton);

      const cancelModalButton = screen.getByTestId('cancel-button');
      await userEvent.click(cancelModalButton);

      expect(screen.queryByTestId('warning-modal')).not.toBeInTheDocument();
    });

    it('navigates back to SelectView when confirm is clicked in modal', async () => {
      renderWithSearchParams('method=iban');

      const goBackButton = screen.getByRole('button', { name: /go back/i });
      await userEvent.click(goBackButton);

      const confirmButton = screen.getByTestId('confirm-button');
      await userEvent.click(confirmButton);

      await waitFor(() => {
        expect(screen.queryByTestId('warning-modal')).not.toBeInTheDocument();
        expect(screen.getByTestId('select-view')).toBeInTheDocument();
        expect(screen.queryByTestId('transfer-view')).not.toBeInTheDocument();
      });
    });
  });

  describe('URL Parameter Handling', () => {
    it('updates view when URL search params change', () => {
      const { rerender } = renderPage();

      expect(screen.getByTestId('select-view')).toBeInTheDocument();

      renderWithSearchParams('method=iban');

      rerender(
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <TransfersPage />
          </ThemeProvider>
        </BrowserRouter>,
      );

      expect(screen.getByTestId('transfer-view')).toBeInTheDocument();
      expect(screen.getByText('Transfer Method: iban')).toBeInTheDocument();
    });
  });
});
