import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { TransfersLayout, TTransferMethod } from './TransfersLayout';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        goBack: 'Go Back',
        'warningModal.title': 'Warning',
        'warningModal.description':
          'Are you sure you want to go back? Your progress will be lost.',
      };
      return translations[key] || key;
    },
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('components/organisms', () => ({
  NavigationWarningModal: ({
    open,
    onConfirm,
    onCancel,
    title,
    description,
    testId,
  }: {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    description: string;
    testId: string;
  }) =>
    open ? (
      <div data-testid={testId}>
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
  SelectView: ({ 'data-testid': testId }: { 'data-testid': string }) => (
    <div data-testid={testId}>Select Transfer Method</div>
  ),
  TransferView: ({
    transferMethod,
    onCancel,
    'data-testid': testId,
  }: {
    transferMethod: TTransferMethod;
    onCancel: () => void;
    'data-testid': string;
  }) => (
    <div data-testid={testId}>
      <div>Transfer Method: {transferMethod}</div>
      <button onClick={onCancel} data-testid="transfer-cancel-button">
        Cancel Transfer
      </button>
    </div>
  ),
}));

interface TestWrapperProps {
  children: React.ReactNode;
  initialUrl?: string;
}

const TestWrapper = ({ children, initialUrl = '/' }: TestWrapperProps) => {
  if (initialUrl !== '/') {
    window.history.pushState({}, '', initialUrl);
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </BrowserRouter>
  );
};

const renderTransfersPage = (initialUrl?: string) => {
  return render(
    <TestWrapper initialUrl={initialUrl}>
      <TransfersLayout />
    </TestWrapper>,
  );
};

describe('TransfersLayout', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  describe('Initial render without transfer method', () => {
    it('should render SelectView when no transfer method is specified', () => {
      renderTransfersPage();

      expect(screen.getByTestId('select-view')).toBeInTheDocument();
      expect(screen.getByText('Select Transfer Method')).toBeInTheDocument();
    });

    it('should not render back button when no transfer method is specified', () => {
      renderTransfersPage();

      expect(screen.queryByTestId('back-button')).not.toBeInTheDocument();
    });

    it('should not render warning modal initially', () => {
      renderTransfersPage();

      expect(screen.queryByTestId('warning-modal')).not.toBeInTheDocument();
    });
  });

  describe('Render with valid transfer methods', () => {
    const validMethods: TTransferMethod[] = ['iban', 'card', 'owncards'];

    validMethods.forEach((method) => {
      it(`should render TransferView and back button when method is ${method}`, () => {
        renderTransfersPage(`/?method=${method}`);

        expect(screen.getByTestId('transfer-view')).toBeInTheDocument();
        expect(
          screen.getByText(`Transfer Method: ${method}`),
        ).toBeInTheDocument();
        expect(screen.getByTestId('back-button')).toBeInTheDocument();
        expect(screen.getByText('Go Back')).toBeInTheDocument();
      });
    });

    it('should not render SelectView when valid transfer method is specified', () => {
      renderTransfersPage('/?method=iban');

      expect(screen.queryByTestId('select-view')).not.toBeInTheDocument();
    });
  });

  describe('Invalid transfer method handling', () => {
    it('should render SelectView when invalid transfer method is specified', () => {
      renderTransfersPage('/?method=invalid');

      expect(screen.getByTestId('select-view')).toBeInTheDocument();
      expect(screen.queryByTestId('transfer-view')).not.toBeInTheDocument();
      expect(screen.queryByTestId('back-button')).not.toBeInTheDocument();
    });

    it('should render SelectView when empty method parameter is provided', () => {
      renderTransfersPage('/?method=');

      expect(screen.getByTestId('select-view')).toBeInTheDocument();
      expect(screen.queryByTestId('transfer-view')).not.toBeInTheDocument();
    });
  });

  describe('Navigation warning modal interactions', () => {
    it('should open warning modal when back button is clicked', async () => {
      renderTransfersPage('/?method=iban');

      const backButton = screen.getByTestId('back-button');
      fireEvent.click(backButton);

      await waitFor(() => {
        expect(screen.getByTestId('warning-modal')).toBeInTheDocument();
      });

      expect(screen.getByText('Warning')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Are you sure you want to go back? Your progress will be lost.',
        ),
      ).toBeInTheDocument();
    });

    it('should open warning modal when transfer cancel button is clicked', async () => {
      renderTransfersPage('/?method=card');

      const cancelButton = screen.getByTestId('transfer-cancel-button');
      fireEvent.click(cancelButton);

      await waitFor(() => {
        expect(screen.getByTestId('warning-modal')).toBeInTheDocument();
      });
    });

    it('should close warning modal when cancel button in modal is clicked', async () => {
      renderTransfersPage('/?method=iban');

      const backButton = screen.getByTestId('back-button');
      fireEvent.click(backButton);

      await waitFor(() => {
        expect(screen.getByTestId('warning-modal')).toBeInTheDocument();
      });

      const modalCancelButton = screen.getByTestId('cancel-button');
      fireEvent.click(modalCancelButton);

      await waitFor(() => {
        expect(screen.queryByTestId('warning-modal')).not.toBeInTheDocument();
      });

      expect(screen.getByTestId('transfer-view')).toBeInTheDocument();
    });

    it('should redirect to SelectView when confirm button in modal is clicked', async () => {
      renderTransfersPage('/?method=owncards');

      expect(screen.getByTestId('transfer-view')).toBeInTheDocument();

      const backButton = screen.getByTestId('back-button');
      fireEvent.click(backButton);

      await waitFor(() => {
        expect(screen.getByTestId('warning-modal')).toBeInTheDocument();
      });

      const confirmButton = screen.getByTestId('confirm-button');
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(screen.queryByTestId('warning-modal')).not.toBeInTheDocument();
        expect(screen.getByTestId('select-view')).toBeInTheDocument();
        expect(screen.queryByTestId('transfer-view')).not.toBeInTheDocument();
        expect(screen.queryByTestId('back-button')).not.toBeInTheDocument();
      });
    });
  });

  describe('URL parameter handling', () => {
    it('should handle multiple URL parameters correctly', () => {
      renderTransfersPage('/?method=iban&other=value');

      expect(screen.getByTestId('transfer-view')).toBeInTheDocument();
      expect(screen.getByText('Transfer Method: iban')).toBeInTheDocument();
    });

    it('should be case sensitive for transfer method validation', () => {
      renderTransfersPage('/?method=IBAN');

      expect(screen.getByTestId('select-view')).toBeInTheDocument();
      expect(screen.queryByTestId('transfer-view')).not.toBeInTheDocument();
    });
  });
});
