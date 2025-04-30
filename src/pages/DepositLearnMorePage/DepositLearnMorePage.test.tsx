import { ThemeProvider } from '@mui/material/styles';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate, useParams } from 'react-router-dom';

import { DepositLearnMorePage } from './DepositLearnMorePage';

import { useGetDepositsQuery } from 'api/getDepositsApi';
import { theme } from 'theme/theme';

jest.mock('components/atoms/DepositErrorMessage/DepositErrorMessage', () => ({
  DepositErrorMessage: () => <div>error</div>,
}));

jest.mock('api/getDepositsApi', () => ({
  useGetDepositsQuery: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const renderPage = () =>
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <DepositLearnMorePage />
      </MemoryRouter>
    </ThemeProvider>,
  );

describe('DepositLearnMorePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
    (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    (useGetDepositsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      data: {
        content: [
          {
            id: 1,
            name: 'Test Deposit',
            description: 'Test Description',
            imageUrl: 'test.jpg',
            interestRate: 5,
            minAmount: 1000,
            maxAmount: 10000,
          },
        ],
      },
      isError: false,
    });
  });

  it('renders correctly', () => {
    const { container } = renderPage();
    expect(container).toMatchSnapshot();
  });

  it('renders loading state', () => {
    (useGetDepositsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
    });

    const { getByRole } = renderPage();
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useGetDepositsQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
    });

    const { getByText } = renderPage();
    expect(getByText('error')).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    const navigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigate);

    const { getByTestId } = renderPage();
    const backButton = getByTestId('back-button');
    backButton.click();

    expect(navigate).toHaveBeenCalledWith(-1);
  });

  it('opens deposit form when "Open Deposit" button is clicked', async () => {
    const { getByTestId } = renderPage();
    const openDepositButton = getByTestId('open-current-deposit-button');

    openDepositButton.click();

    await waitFor(() =>
      expect(getByTestId('deposit-creation-form')).toBeInTheDocument(),
    );
  });

  it('opens available deposits window when "View All Deposits" button is clicked', async () => {
    const { getByTestId } = renderPage();
    const openDepositButton = getByTestId('open-all-deposits-button');

    openDepositButton.click();

    await waitFor(() =>
      expect(getByTestId('available-deposits-window')).toBeInTheDocument(),
    );
  });
});
