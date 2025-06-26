import { ThemeProvider } from '@mui/material';
import {
  act,
  fireEvent,
  render,
  screen,
  within,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { DepositCreationForm } from './DepositCreationForm';

import store from 'store';
import { theme } from 'theme/theme';
import { TCurrency } from 'types/card';

const mockCreateDeposit = jest.fn().mockResolvedValue({});
const mockOnBack = jest.fn();
const mockShowSuccessModal = jest.fn();
const mockShowErrorModal = jest.fn();
const mockOnDepositSubmit = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'confirmationModals.successTitle': 'Opened successfully!',
        'confirmationModals.depositFailTitle': 'Opening Deposit failed!',
      };
      return translations[key] || key;
    },
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('./hooks/useUserAccounts', () => ({
  useUserAccounts: () => ({
    accountOptions: [
      { iban: 'PL123456789', balance: 5000, currency: 'USD' },
      { iban: 'PL987654321', balance: 2500, currency: 'USD' },
    ],
    isLoading: false,
  }),
  useCreateDeposit: () => [mockCreateDeposit, { isLoading: false }],
}));

let mockFormState = {
  showSuccessModal: false,
  showErrorModal: false,
  errorMessage: '',
  isSubmitDisabled: true,
};

jest.mock('./hooks/useDepositForm', () => ({
  useDepositForm: () => {
    const originalModule = jest.requireActual('react-hook-form');
    const form = originalModule.useForm({
      defaultValues: {
        amount: undefined,
        account: '',
        checkbox: false,
      },
      mode: 'all',
    });

    return {
      form,
      onDepositSubmit: form.handleSubmit(mockOnDepositSubmit),
      amountValue: form.watch('amount'),
      errors: form.formState.errors,
      isSubmitDisabled: mockFormState.isSubmitDisabled,
      showSuccessModal: mockFormState.showSuccessModal,
      setShowSuccessModal: mockShowSuccessModal,
      showErrorModal: mockFormState.showErrorModal,
      setShowErrorModal: mockShowErrorModal,
      errorMessage: mockFormState.errorMessage,
      isSubmitting: false,
    };
  },
}));

const mockDepositProps = {
  onBack: mockOnBack,
  depositId: 59,
  depositName: 'Business Deposit',
  currency: 'USD' as TCurrency,
  interestRate: 2,
  term: 12,
};

const renderForm = async (props = {}) => {
  let container;
  await act(async () => {
    container = render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <MemoryRouter>
            <DepositCreationForm
              depositId={mockDepositProps.depositId}
              depositName={mockDepositProps.depositName}
              interestRate={mockDepositProps.interestRate}
              term={mockDepositProps.term}
              currency={mockDepositProps.currency}
              onBack={mockDepositProps.onBack}
              {...props}
            />
          </MemoryRouter>
        </Provider>
      </ThemeProvider>,
    ).container;
  });

  await waitFor(() => {
    expect(screen.getByTestId('deposit-creation-form')).toBeInTheDocument();
  });

  return container;
};
function mockDepositFormState({
  showSuccessModal = false,
  showErrorModal = false,
  errorMessage = '',
  isSubmitDisabled = true,
} = {}) {
  mockFormState = {
    showSuccessModal,
    showErrorModal,
    errorMessage,
    isSubmitDisabled,
  };
}

describe('DepositCreationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFormState = {
      showSuccessModal: false,
      showErrorModal: false,
      errorMessage: '',
      isSubmitDisabled: true,
    };
  });

  it('matches snapshot', async () => {
    const container = await renderForm();
    expect(container).toMatchSnapshot();
  });

  it('renders the form components', async () => {
    await renderForm();

    expect(screen.getByTestId('deposit-creation-form')).toBeInTheDocument();
    expect(screen.getByTestId('deposit-amount')).toBeInTheDocument();
    expect(screen.getByTestId('account-select')).toBeInTheDocument();
    expect(screen.getByTestId('interest-info')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'openDeposit' }),
    ).toBeInTheDocument();
  });

  it('"Open deposit" button is disabled when the form is not valid', async () => {
    await renderForm();

    const submitButton = screen.getByRole('button', { name: 'openDeposit' });
    expect(submitButton).toBeDisabled();
  });

  it("enables 'Open deposit' when form is valid", async () => {
    mockDepositFormState({ isSubmitDisabled: false });
    await renderForm();

    const amountWrapper = screen.getByTestId('deposit-amount');
    const amountInput = amountWrapper.querySelector('input')!;
    const accountSelect = screen.getByTestId('account-select');
    const checkbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: 'openDeposit' });

    const input = within(accountSelect).getByRole('combobox');
    fireEvent.mouseDown(input);

    const listbox = await screen.findByRole('listbox');
    const firstOption = within(listbox).getAllByRole('option')[0];
    fireEvent.click(firstOption);

    fireEvent.change(amountInput, { target: { value: '1000' } });
    fireEvent.click(checkbox);

    expect(submitButton).not.toBeDisabled();
  });

  it('shows error modal when amount exceeds balance', async () => {
    mockDepositFormState({ isSubmitDisabled: false });
    await renderForm();

    const amountWrapper = screen.getByTestId('deposit-amount');
    const amountInput = amountWrapper.querySelector('input')!;
    const accountSelect = screen.getByTestId('account-select');
    const checkbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: 'openDeposit' });

    const input = within(accountSelect).getByRole('combobox');
    fireEvent.mouseDown(input);

    const listbox = await screen.findByRole('listbox');
    const firstOption = within(listbox).getAllByRole('option')[0];
    fireEvent.click(firstOption);

    fireEvent.change(amountInput, { target: { value: '6000' } });
    fireEvent.click(checkbox);

    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
  });

  it('shows the success modal when showSuccessModal is true', async () => {
    mockDepositFormState({ showSuccessModal: true });
    await renderForm();

    expect(screen.getByText('Opened successfully!')).toBeInTheDocument();
  });

  it('shows the error modal with a message when showErrorModal is true', async () => {
    mockDepositFormState({ showErrorModal: true });
    await renderForm();

    expect(screen.getByText('Opening Deposit failed!')).toBeInTheDocument();
  });
});
