import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { ConfirmTransferModal } from './ConfirmTransferModal';

import { useGetTransferFeeQuery } from 'api/accountsApi';
import { TCurrency } from 'models/types';
import { TTransferMethod } from 'pages/TransfersPage/TransfersPage';
import { theme } from 'theme/theme';

jest.mock('api/accountsApi', () => ({
  useGetTransferFeeQuery: jest.fn(),
}));

const defaultProps = {
  open: true,
  onClose: jest.fn(),
  onConfirm: jest.fn(),
  transferMethod: 'card' as TTransferMethod,
  isTransferring: false,
  transferInfo: {
    fromAccount: '1234567890123456',
    toAccount: '6543210987654321',
    amount: '100',
    currency: 'PLN' as TCurrency,
  },
};

const renderModal = (props = defaultProps) =>
  render(
    <ThemeProvider theme={theme}>
      <ConfirmTransferModal {...props} />
    </ThemeProvider>,
  );

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('ConfirmTransferModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGetTransferFeeQuery as jest.Mock).mockReturnValue({
      data: { amount: 100, fee: 5, totalAmount: 105 },
      isLoading: false,
      isError: false,
      isSuccess: true,
    });
    renderModal();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correct card transfer details', () => {
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    expect(screen.getByText(/3456/i)).toBeInTheDocument();
    expect(screen.getByText(/4321/i)).toBeInTheDocument();
    expect(screen.getByText('PLN 100,00')).toBeInTheDocument();
  });

  it('renders correct account transfer details', () => {
    renderModal({
      ...defaultProps,
      transferMethod: 'iban' as TTransferMethod,
      transferInfo: {
        ...defaultProps.transferInfo,
        fromAccount: 'PL12345678901234567890123456',
        toAccount: 'PL09876543210987654321098765',
      },
    });
    expect(
      screen.getByText('PL12345678901234567890123456'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('PL09876543210987654321098765'),
    ).toBeInTheDocument();
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
    renderModal({
      ...defaultProps,
      transferInfo: {
        ...defaultProps.transferInfo,
        currency: 'USD',
        amount: '50',
      },
    });
    expect(screen.getByText('USD 50,00')).toBeInTheDocument();
  });

  it('does not render any modal content when open is false', async () => {
    renderModal({ ...defaultProps, open: false });
    waitFor(() => {
      expect(screen.getByText('Confirm Transfer')).not.toBeInTheDocument();
    });
  });
});
