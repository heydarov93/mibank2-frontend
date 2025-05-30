import { fireEvent, render } from '@testing-library/react';

import { AlertDialog } from './AlertDialog';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('AlertDialog', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<AlertDialog open onClose={jest.fn()} />);
    expect(getByTestId('transfer-successful-modal')).toMatchSnapshot();
  });

  it('displays the default success message when no message is provided', () => {
    const { getByText } = render(<AlertDialog open onClose={jest.fn()} />);
    expect(getByText('success.message')).toBeInTheDocument();
  });

  it('displays provided message', () => {
    const { getByText } = render(
      <AlertDialog open onClose={jest.fn()} message="Custom message" />,
    );
    expect(getByText('Custom message')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByTestId } = render(<AlertDialog open onClose={onCloseMock} />);
    fireEvent.click(getByTestId('close-success-transfer-modal'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
