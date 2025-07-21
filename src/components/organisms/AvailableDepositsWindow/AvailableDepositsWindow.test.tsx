import { render, screen } from '@testing-library/react';

import { AvailableDepositsWindow } from './AvailableDepositsWindow';

import { useGetDepositsQuery } from 'api/services/deposit-service/deposits.api';

jest.mock('api/services/deposit-service/deposits.api', () => ({
  useGetDepositsQuery: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('./atoms/ErrorMessage/ErrorMessage', () => ({
  ErrorMessage: () => <div>Deposit Not Found</div>,
}));

jest.mock('components/molecules', () => ({
  DepositBox: ({
    depositName,
    depositDescription,
  }: {
    depositName: string;
    depositDescription: string;
  }) => (
    <div>
      <h1>{depositName}</h1>
      <p>{depositDescription}</p>
    </div>
  ),
}));

jest.mock('components/atoms', () => ({
  CloseButton: () => <button data-testid="close-button"> Close</button>,
}));

describe('AvailableDepositsWindow', () => {
  it('renders when open is true', () => {
    (useGetDepositsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      isError: false,
    });

    render(
      <AvailableDepositsWindow
        open={true}
        onClose={jest.fn()}
        onSelectDeposit={jest.fn()}
      />,
    );
    expect(screen.getByText('availableDeposits')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    (useGetDepositsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      isError: false,
    });

    render(
      <AvailableDepositsWindow
        open={false}
        onClose={jest.fn()}
        onSelectDeposit={jest.fn()}
      />,
    );
    expect(screen.queryByText('availableDeposits')).not.toBeInTheDocument();
  });

  it('displays loading state', () => {
    (useGetDepositsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
    });

    render(
      <AvailableDepositsWindow
        open={true}
        onClose={jest.fn()}
        onSelectDeposit={jest.fn()}
      />,
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays error message', () => {
    (useGetDepositsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
    });

    render(
      <AvailableDepositsWindow
        open={true}
        onClose={jest.fn()}
        onSelectDeposit={jest.fn()}
      />,
    );
    expect(screen.getByText('Deposit Not Found')).toBeInTheDocument();
  });
});
