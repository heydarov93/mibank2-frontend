import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CardDetailRow } from './CardDetailRow';

describe('CardDetailRow', () => {
  it('renders visible value by default if no hiddenDataFormat', () => {
    render(<CardDetailRow name="Card Number" value="1234" />);

    expect(screen.getByText('Card Number')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
    expect(screen.queryByTestId('visibility-toggle')).not.toBeInTheDocument();
  });

  it('renders hiddenDataFormat initially when provided', () => {
    render(
      <CardDetailRow
        name="Card Number"
        value="1234567890123456"
        maskFormat="**** 3456"
      />,
    );

    expect(screen.getByText('Card Number')).toBeInTheDocument();
    expect(screen.getByText('**** 3456')).toBeInTheDocument();
  });

  it('toggles visibility on button click', async () => {
    render(
      <CardDetailRow
        name="Card Number"
        value="1234567890123456"
        maskFormat="**** 3456"
      />,
    );

    expect(screen.getByText('**** 3456')).toBeInTheDocument();
    expect(screen.queryByText('1234567890123456')).not.toBeInTheDocument();

    act(() => userEvent.click(screen.getByTestId('visibility-toggle')));

    expect(screen.getByText('1234567890123456')).toBeInTheDocument();
    expect(screen.queryByText('**** 3456')).not.toBeInTheDocument();
  });

  it('renders copy button when copyable is true', () => {
    render(
      <CardDetailRow name="IBAN" value="PL123456789" onCopy={jest.fn()} />,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('PL123456789')).toBeInTheDocument();
  });
});
