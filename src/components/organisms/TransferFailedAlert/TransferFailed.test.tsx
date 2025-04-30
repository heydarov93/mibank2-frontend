import { fireEvent, render } from '@testing-library/react';

import { TransferFailedAlert } from './TransferFailedAlert';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('TransferFailedAlert', () => {
  it('renders correctly', () => {
    const { container } = render(
      <TransferFailedAlert open onClose={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('displays the default error message when no message is provided', () => {
    const { getByText } = render(
      <TransferFailedAlert open onClose={jest.fn()} />,
    );
    expect(getByText('defaultErrorText')).toBeInTheDocument();
  });

  it('displays provided message', () => {
    const { getByText } = render(
      <TransferFailedAlert open onClose={jest.fn()} message="Custom message" />,
    );
    expect(getByText('Custom message')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(
      <TransferFailedAlert open onClose={onCloseMock} />,
    );
    fireEvent.click(getByTestId('close-failed-transfer-alert'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
