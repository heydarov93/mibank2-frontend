import { fireEvent, render } from '@testing-library/react';

import { TransferSuccessfulModal } from './TransferSuccessfulModal';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('TransferSuccessfulModal', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(
      <TransferSuccessfulModal open onClose={jest.fn()} />,
    );
    expect(getByTestId('transfer-successful-modal')).toMatchSnapshot();
  });

  it('displays the default success message when no message is provided', () => {
    const { getByText } = render(
      <TransferSuccessfulModal open onClose={jest.fn()} />,
    );
    expect(getByText('defaultSuccessText')).toBeInTheDocument();
  });

  it('displays provided message', () => {
    const { getByText } = render(
      <TransferSuccessfulModal
        open
        onClose={jest.fn()}
        message="Custom message"
      />,
    );
    expect(getByText('Custom message')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <TransferSuccessfulModal open onClose={onCloseMock} />,
    );
    fireEvent.click(getByTestId('close-success-transfer-modal'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it('calls "onViewReceipt" when the "View Receipt" button is clicked', () => {
    const onViewReceiptMock = jest.fn();
    const { getByText } = render(
      <TransferSuccessfulModal
        open
        onClose={jest.fn()}
        onViewReceipt={onViewReceiptMock}
      />,
    );
    fireEvent.click(getByText('viewReceipt'));
    expect(onViewReceiptMock).toHaveBeenCalledTimes(1);
  });

  it('calls "onNewTransfer" when the "New Transfer" button is clicked', () => {
    const onNewTransferMock = jest.fn();
    const { getByText } = render(
      <TransferSuccessfulModal
        open
        onClose={jest.fn()}
        onNewTransfer={onNewTransferMock}
      />,
    );
    fireEvent.click(getByText('newTransfer'));
    expect(onNewTransferMock).toHaveBeenCalledTimes(1);
  });
});
