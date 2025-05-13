import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import BackOfficeCardEditForm from './BackOfficeCardEditForm';

import { TableData } from 'components/molecules/BackOfficeTableItem/BackOfficeTableItem';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('components/molecules/MiAutoComplete/MiAutoComplete', () => {
  const MockAutoComplete = ({ value, onChange }: any) => (
    <input
      data-testid="card-currency-input"
      value={value || ''}
      onChange={(e) => onChange(null, e.target.value)}
    />
  );
  return MockAutoComplete;
});

const validFormData: Partial<TableData> = {
  productName: 'Card',
  cardDescription: 'Valid Description for Card',
  cardCurrency: 'USD',
  cardCashbackRate: '12',
  monthlyFee: '10',
  dailyOperationalLimit: '3',
  foreignTransactionLimit: '12',
};

describe('BackOfficeCardEditForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', () => {
    render(<BackOfficeCardEditForm handleClose={() => {}} />);
    expect(screen.getByText('cardEditForm.editCard')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('cardEditForm.cardName'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('cardEditForm.cardDescription'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('card-currency-input')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('cardEditForm.cashbackRate'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('cardEditForm.monthlyFee'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('cardEditForm.dailyOperationalLimit'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('cardEditForm.foreignTransactionLimit'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'cardEditForm.saveChanges' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'cardEditForm.cancel' }),
    ).toBeInTheDocument();
  });

  test('submit button is disabled when form is invalid', () => {
    render(<BackOfficeCardEditForm handleClose={() => {}} />);
    const submitButton = screen.getByRole('button', {
      name: 'cardEditForm.saveChanges',
    });
    expect(submitButton).toBeDisabled();
  });

  test('submit button is enabled with valid formData', () => {
    render(
      <BackOfficeCardEditForm
        handleClose={() => {}}
        formData={validFormData}
      />,
    );
    const submitButton = screen.getByRole('button', {
      name: 'cardEditForm.saveChanges',
    });
    waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });

  test('calls handleClose when cancel button is clicked', () => {
    const handleClose = jest.fn();
    render(<BackOfficeCardEditForm handleClose={handleClose} />);
    const cancelButton = screen.getByRole('button', {
      name: 'cardEditForm.cancel',
    });
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('calls handleClose when clicking cancel button', () => {
    const handleClose = jest.fn();
    render(
      <BackOfficeCardEditForm
        handleClose={handleClose}
        formData={validFormData}
      />,
    );
    const cancelButton = screen.getByRole('button', {
      name: 'cardEditForm.cancel',
    });
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test('pre-fills form fields with formData', () => {
    render(
      <BackOfficeCardEditForm
        handleClose={() => {}}
        formData={validFormData}
      />,
    );
    expect(screen.getByPlaceholderText('cardEditForm.cardName')).toHaveValue(
      'Card',
    );
    expect(
      screen.getByPlaceholderText('cardEditForm.cardDescription'),
    ).toHaveValue('Valid Description for Card');
    expect(screen.getByTestId('card-currency-input')).toHaveValue('USD');
    expect(
      screen.getByPlaceholderText('cardEditForm.cashbackRate'),
    ).toHaveValue('12');
    expect(screen.getByPlaceholderText('cardEditForm.monthlyFee')).toHaveValue(
      '10',
    );
    expect(
      screen.getByPlaceholderText('cardEditForm.dailyOperationalLimit'),
    ).toHaveValue('3');
    expect(
      screen.getByPlaceholderText('cardEditForm.foreignTransactionLimit'),
    ).toHaveValue('12');
  });
});
