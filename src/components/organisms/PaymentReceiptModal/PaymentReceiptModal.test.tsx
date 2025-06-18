import { render } from '@testing-library/react';

import { PaymentReceiptModal } from './PaymentReceiptModal';

import { TCurrency } from 'models/types';

const onCloseMock = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

const renderModal = (open = true) =>
  render(
    <PaymentReceiptModal
      open={open}
      onClose={onCloseMock}
      receiptInfo={{
        payerName: 'string',
        date: 'string',
        fromAccount: '1234567890123456',
        toAccount: '6543210987654321',
        amount: '100',
        currency: 'PLN' as TCurrency,
        fee: 2.5,
        totalAmount: 102.5,
        transferMethod: 'card',
      }}
    />,
  );

describe('PaymentReceiptModal', () => {
  it('renders correctly', () => {
    const { getByTestId } = renderModal();
    expect(getByTestId('payment-receipt-modal')).toMatchSnapshot();
  });

  it('opens when "open" is true', () => {
    const { getByTestId } = renderModal();
    expect(getByTestId('payment-receipt-modal')).toBeVisible();
  });

  it('is not visible when "open" is false', () => {
    const { queryByTestId } = renderModal(false);
    expect(queryByTestId('payment-receipt-modal')).toBeNull();
  });

  it('calls "onClose" when close button is clicked', () => {
    const { getByTestId } = renderModal();
    const closeButton = getByTestId('payment-receipt-close-button');
    closeButton.click();
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
