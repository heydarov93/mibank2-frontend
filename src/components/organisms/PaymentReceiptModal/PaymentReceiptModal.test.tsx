import { render } from '@testing-library/react';

import { PaymentReceiptModal } from './PaymentReceiptModal';

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
      date="10.12.2024"
      payer="Grzegorz Brzeczyszczykiewicz"
      from="EU12 1116 6660 0000 0001 2345 678"
      to="DE44 1234 1234 1234 1234 00"
      service="Service Name"
      amount={100}
      fee={5}
      currency="USD"
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
