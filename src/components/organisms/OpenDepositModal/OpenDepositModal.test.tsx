import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { OpenDepositModal } from './OpenDepositModal';

import store from 'store';
import { theme } from 'theme/theme';
import { TCurrency } from 'types/types';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock(
  'components/molecules/DepositCreationForm/DepositCreationForm',
  () => {
    const MockForm = (props: any) => (
      <div data-testid="deposit-creation-form">
        {props.onCloseModal && (
          <button onClick={props.onCloseModal}>Close Form</button>
        )}
        <button onClick={props.onBack}>Back</button>
        <div>Deposit ID: {props.depositId}</div>
        <div>Currency: {props.currency}</div>
        <div>Interest Rate: {props.interestRate}</div>
        <div>Term: {props.term}</div>
      </div>
    );
    MockForm.displayName = 'MockDepositCreationForm';
    return {
      __esModule: true,
      DepositCreationForm: MockForm,
    };
  },
);

jest.mock('components/molecules/DepositInfoCard/DepositInfoCard', () => {
  const MockInfoCard = (props: any) => (
    <div data-testid="deposit-info-card">
      <h2>{props.name}</h2>
      <p>{props.description}</p>
    </div>
  );
  MockInfoCard.displayName = 'MockDepositInfoCard';
  return {
    __esModule: true,
    DepositInfoCard: MockInfoCard,
  };
});

const mockOnClose = jest.fn();
const mockOnBack = jest.fn();

const mockDepositData = {
  augmentable: false,
  autoRenewable: false,
  capitalization: 20,
  currency: 'USD' as TCurrency,
  description: 'Test Description',
  earlyWithdrawal: false,
  earlyWithdrawalFee: 10,
  earlyWithdrawalLimit: 30,
  id: 1,
  interestRate: 2,
  max: 100,
  min: 50,
  name: 'Test Deposit',
  term: 12,
  type: 'deposit',
};

const renderComponent = (deposit: typeof mockDepositData | null) =>
  render(
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <OpenDepositModal
          deposit={deposit}
          onClose={mockOnClose}
          onBack={mockOnBack}
        />
      </Provider>
    </ThemeProvider>,
  );

describe('OpenDepositModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not render form or info card when deposit is null', () => {
    renderComponent(null);
    expect(screen.queryByTestId('deposit-creation-form')).toBeNull();
    expect(screen.queryByTestId('deposit-info-card')).toBeNull();
  });

  it('renders form and info card when deposit is provided', () => {
    renderComponent(mockDepositData);
    expect(screen.getByTestId('deposit-creation-form')).toBeInTheDocument();
    expect(screen.getByTestId('deposit-info-card')).toBeInTheDocument();
  });

  it('passes correct props to DepositCreationForm', () => {
    renderComponent(mockDepositData);
    expect(screen.getByText('Deposit ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Currency: USD')).toBeInTheDocument();
    expect(screen.getByText('Interest Rate: 2')).toBeInTheDocument();
    expect(screen.getByText('Term: 12')).toBeInTheDocument();
  });

  it('calls onBack when "Back" is clicked', () => {
    renderComponent(mockDepositData);
    fireEvent.click(screen.getByText('Back'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('calls onBack when close button is clicked', () => {
    renderComponent(mockDepositData);
    fireEvent.click(screen.getByTestId('modal-close-button'));
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });
});
