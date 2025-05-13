import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ConfirmTransferModal } from './ConfirmTransferModal';

import { theme } from 'theme/theme';

const defaultProps = {
  open: true,
  onClose: jest.fn(),
  transferType: 'card' as const,
  from: '1234567890123456',
  to: '6543210987654321',
  amount: 100,
  fee: 2.5,
  currency: 'AZN',
};

const renderModal = (props = {}) =>
  render(
    <ThemeProvider theme={theme}>
      <ConfirmTransferModal {...defaultProps} {...props} />
    </ThemeProvider>,
  );

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

describe('ConfirmTransferModal', () => {
  beforeEach(() => {
    renderModal();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct card transfer details', () => {
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    expect(screen.getByText('••••3456')).toBeInTheDocument();
    expect(screen.getByText('••••4321')).toBeInTheDocument();
    expect(screen.getByText('AZN 100,00')).toBeInTheDocument();
    expect(screen.getByText('AZN 2,50')).toBeInTheDocument();
    expect(screen.getByText('AZN 102,50')).toBeInTheDocument();
  });

  it('renders correct account transfer details', () => {
    renderModal({
      transferType: 'account',
      from: 'AZ1234567890',
      to: 'AZ0987654321',
    });
    expect(screen.getByText('AZ1234567890')).toBeInTheDocument();
    expect(screen.getByText('AZ0987654321')).toBeInTheDocument();
  });

  it('calls onClose when Cancel or Close icon is clicked', () => {
    fireEvent.click(screen.getByText(/cancel/i));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByTestId('close-icon'));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(2);
  });

  it('renders confirm button', () => {
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();
  });

  it('renders correctly with different currency', () => {
    renderModal({ currency: 'USD', amount: 50, fee: 1.5 });
    expect(screen.getByText('USD 50,00')).toBeInTheDocument();
    expect(screen.getByText('USD 1,50')).toBeInTheDocument();
    expect(screen.getByText('USD 51,50')).toBeInTheDocument();
  });

  it('does not render any modal content when open is false', async () => {
    renderModal({ open: false });
    waitFor(() => {
      expect(screen.getByText('Confirm Transfer')).not.toBeInTheDocument();
    });
  });
});
