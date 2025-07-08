import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import BackOfficeDepositEditForm from './BackOfficeDepositEditForm';

import { depositsApi } from 'api';
import { TableData } from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const mockStore = configureStore({
  reducer: {
    [depositsApi.reducerPath]: depositsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(depositsApi.middleware);
  },
});

const validFormData: Partial<TableData> = {
  productName: 'Deposit',
  cardDescription: 'Valid Deposit Description',
  cardCurrency: 'USD',
  minimumDepositSum: '1',
  maximumDepositSum: '3',
  depositTerm: '3',
  depositInterestRate: '4',
  depositCapitalizationRate: '4',
  earlyWithdrawalLimit: '5',
  withdrawalFee: '3',
};

test('renders component without crashing', () => {
  render(
    <Provider store={mockStore}>
      <BackOfficeDepositEditForm onClose={() => {}} onError={() => {}} />
    </Provider>,
  );
  expect(screen.getByText('depositEditForm.editDep')).toBeInTheDocument();
  expect(screen.getByText('depositEditForm.depName')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('depositEditForm.depName'),
  ).toBeInTheDocument();
  expect(screen.getByText('depositEditForm.depDesc')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('depositEditForm.depDesc'),
  ).toBeInTheDocument();
  expect(screen.getByText('depositEditForm.depCurr')).toBeInTheDocument();
  expect(screen.getByText('depositEditForm.minDep')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('depositEditForm.minDep'),
  ).toBeInTheDocument();
  expect(screen.getByText('depositEditForm.maxDep')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('depositEditForm.maxDep'),
  ).toBeInTheDocument();
  expect(screen.getByText('depositEditForm.depTerm')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('depositEditForm.depTerm'),
  ).toBeInTheDocument();
  expect(screen.getByText('depositEditForm.depInt')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('depositEditForm.depInt'),
  ).toBeInTheDocument();
  expect(screen.getByText('depositEditForm.depCap')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('depositEditForm.depCap'),
  ).toBeInTheDocument();
  expect(screen.getByText('depositEditForm.depName')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('depositEditForm.depName'),
  ).toBeInTheDocument();
  expect(screen.getByText('depositEditForm.earlyWd')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('depositEditForm.earlyWd'),
  ).toBeInTheDocument();
  expect(screen.getByText('depositEditForm.wdFee')).toBeInTheDocument();
  expect(
    screen.getByPlaceholderText('depositEditForm.wdFee'),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'depositEditForm.cancel' }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: 'depositEditForm.saveChanges' }),
  ).toBeInTheDocument();
});

test('Submit button is disabled when the form data is invalid', () => {
  render(
    <Provider store={mockStore}>
      <BackOfficeDepositEditForm onClose={() => {}} onError={() => {}} />
    </Provider>,
  );
  const submitButton = screen.getByRole('button', {
    name: 'depositEditForm.saveChanges',
  });
  expect(submitButton).toBeDisabled();
});

test('Submit button is enabled with valid form data', () => {
  render(
    <Provider store={mockStore}>
      <BackOfficeDepositEditForm
        onClose={() => {}}
        onError={() => {}}
        formData={validFormData}
      />
    </Provider>,
  );
  const submitButton = screen.getByRole('button', {
    name: 'depositEditForm.saveChanges',
  });
  waitFor(() => {
    expect(submitButton).not.toBeDisabled();
  });
});

test('Calls handleClose when cancel button is clicked', () => {
  const handleClose = jest.fn();
  render(
    <Provider store={mockStore}>
      <BackOfficeDepositEditForm onClose={handleClose} onError={() => {}} />
    </Provider>,
  );
  const cancelButton = screen.getByRole('button', {
    name: 'depositEditForm.cancel',
  });
  fireEvent.click(cancelButton);
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test('Prefills form with the provided data', () => {
  render(
    <Provider store={mockStore}>
      <BackOfficeDepositEditForm
        onClose={() => {}}
        onError={() => {}}
        formData={validFormData}
      />
    </Provider>,
  );
  expect(screen.getByPlaceholderText('depositEditForm.depName')).toHaveValue(
    'Deposit',
  );
  expect(screen.getByPlaceholderText('depositEditForm.depDesc')).toHaveValue(
    'Valid Deposit Description',
  );
  expect(screen.getByPlaceholderText('depositEditForm.minDep')).toHaveValue(
    '1',
  );
  expect(screen.getByPlaceholderText('depositEditForm.maxDep')).toHaveValue(
    '3',
  );
  expect(screen.getByPlaceholderText('depositEditForm.depTerm')).toHaveValue(
    '3',
  );
  expect(screen.getByPlaceholderText('depositEditForm.depInt')).toHaveValue(
    '4',
  );
  expect(screen.getByPlaceholderText('depositEditForm.depCap')).toHaveValue(
    '4',
  );
  expect(screen.getByPlaceholderText('depositEditForm.earlyWd')).toHaveValue(
    '5',
  );
  expect(screen.getByPlaceholderText('depositEditForm.wdFee')).toHaveValue('3');
});
