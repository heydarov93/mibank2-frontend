import { render, screen } from '@testing-library/react';

import { AvailableDepositsWindow } from './AvailableDepositsWindow';

import { useGetDepositsQuery } from 'api/getDepositsApi';

jest.mock('api/getDepositsApi', () => ({
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

jest.mock('components/atoms', () => ({
  DepositErrorMessage: () => <div>error</div>,
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
        onSetDeposit={jest.fn()}
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
        onSetDeposit={jest.fn()}
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
        onSetDeposit={jest.fn()}
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
        onSetDeposit={jest.fn()}
      />,
    );
    expect(screen.getByText('error')).toBeInTheDocument();
  });
});
