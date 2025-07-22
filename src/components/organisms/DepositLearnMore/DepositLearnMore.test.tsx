import { ThemeProvider } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate, useParams } from 'react-router-dom';

import { DepositLearnMore } from './DepositLearnMore';

import { useGetDepositsQuery } from 'api/services/deposit-service/deposits.api';
import { theme } from 'theme/theme';
import type { TCurrency } from 'types/types';

jest.mock('components/atoms/DepositErrorMessage/DepositErrorMessage', () => ({
  DepositErrorMessage: () => <div>Deposit not found</div>,
}));

jest.mock(
  'components/molecules/DepositCreationForm/hooks/useUserAccounts',
  () => ({
    useUserAccounts: () => ({
      accountOptions: [
        {
          id: 'acc-1',
          iban: 'US1234567890',
          balance: 10000,
          currency: 'USD',
        },
      ],
      isLoading: false,
    }),
    useCreateDeposit: () => [
      jest.fn(() => Promise.resolve({})),
      { isLoading: false },
    ],
  }),
);

jest.mock('api/services/account-service/accounts.api', () => ({
  useGetUserAccountsQuery: jest.fn(() => ({
    data: {
      accounts: [
        {
          id: 'acc-1',
          iban: 'US1234567890',
          balance: 10000,
          currency: 'USD',
        },
      ],
    },
    isLoading: false,
  })),
  getUserAccountsApi: {
    reducerPath: 'getUserAccountsApi',
    reducer: jest.fn(),
  },
}));

jest.mock('api/services/deposit-service/deposits.api', () => ({
  useGetDepositsQuery: jest.fn(),
  getDepositsApi: {
    reducerPath: 'depositsApi',
    reducer: jest.fn(),
  },
}));

const mockStore = configureStore({
  reducer: {
    getDepositsApi: () => ({}),
    getUserAccountsApi: () => ({}),
    getOffersApi: () => ({}),
  },
});

jest.mock('components/organisms/OpenDepositModal/OpenDepositModal', () => ({
  OpenDepositModal: () => <div data-testid="open-deposit-modal-form" />,
}));

jest.mock(
  'components/organisms/AvailableDepositsWindow/AvailableDepositsWindow',
  () => ({
    AvailableDepositsWindow: ({ open }: { open: boolean }) =>
      open ? <div data-testid="available-deposits-window" /> : null,
  }),
);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const onBackMock = jest.fn();
const mockDepositData = {
  id: 1,
  augmentable: true,
  autoRenewable: true,
  capitalization: 10,
  currency: 'PLN' as TCurrency,
  description: 'Some cool description',
  earlyWithdrawal: true,
  earlyWithdrawalFee: 5,
  earlyWithdrawalLimit: 15,
  interestRate: 3,
  max: 99,
  min: 0,
  name: 'Cool name',
  term: 1,
  type: 'good',
};

const renderPage = () =>
  render(
    <ThemeProvider theme={theme}>
      <Provider store={mockStore}>
        <MemoryRouter>
          <DepositLearnMore depositData={mockDepositData} onBack={onBackMock} />
        </MemoryRouter>
      </Provider>
    </ThemeProvider>,
  );

describe('DepositLearnMorePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    (useGetDepositsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: {
        content: [
          {
            id: 1,
            name: 'Test Deposit',
            description: 'Test Description',
            imageUrl: 'test.jpg',
            interestRate: 5,
            currency: 'USD',
            term: 12,
            capitalization: 2,
            earlyWithdrawalFee: 1,
            earlyWithdrawalLimit: 30,
            min: 1000,
          },
        ],
      },
    });
  });

  it('renders loading state', () => {
    (useGetDepositsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
    });

    renderPage();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useGetDepositsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
    });

    renderPage();
    expect(screen.getByText('Deposit not found')).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    renderPage();
    const btn = screen.getByTestId('back-button');
    fireEvent.click(btn);

    expect(onBackMock).toHaveBeenCalled();
  });

  it('opens deposit form when "Open Deposit" button is clicked', async () => {
    renderPage();
    fireEvent.click(screen.getByTestId('open-current-deposit-button'));

    await waitFor(() =>
      expect(screen.getByTestId('open-deposit-modal-form')).toBeInTheDocument(),
    );
  });
});
