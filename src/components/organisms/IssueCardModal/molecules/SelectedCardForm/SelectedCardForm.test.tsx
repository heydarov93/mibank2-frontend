import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

import { SelectedCardForm } from './SelectedCardForm';

import { ECardIssuer } from 'enums/ECardIssuer';
import { useUserAccounts } from 'hooks';
import { IIssuanceCardData } from 'models/ICard';

const translations = {
  confirm: 'Confirmation',
  issueCard: 'Issue Card',
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: keyof typeof translations) => {
      return translations[key] ?? key;
    },
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('hooks/user/useUserAccounts', () => ({
  useUserAccounts: jest.fn(),
}));

const cardData: IIssuanceCardData = {
  cardId: 1,
  cardName: 'Visa Black',
  issueFee: 15,
  issueCurrency: 'PLN',
  cardCurrency: 'PLN',
  cardIssuer: ECardIssuer.VISA,
  cardType: 'Debit',
  issueType: 'Digital',
  cashbackRate: 0.3,
  monthlyFee: 10,
  foreignTransactionLimit: 10000,
  dailyOperationalLimit: 1000,
};

const FormWrapper = (props: IIssuanceCardData) => {
  const methods = useForm({
    defaultValues: {
      paymentAccount: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <SelectedCardForm {...props} onCancel={jest.fn()} background="#000" />
    </FormProvider>
  );
};

const clickOnLink = () => {
  fireEvent.click(screen.getByTestId('agreement-link'));
};

const clickOnSwitch = () => {
  const checkbox = screen.getByTestId('switch-confirmation');
  const input = checkbox.querySelector('input') as HTMLElement;
  expect(input).toBeDisabled();
  clickOnLink();
  expect(input).toBeEnabled();
  fireEvent.click(input);
};

const selectAccount = () => {
  fireEvent.mouseDown(screen.getByRole('combobox'));

  const listbox = screen.getByRole('listbox');
  const firstOption = listbox.querySelector('li') as HTMLElement;

  fireEvent.click(firstOption);
};

const renderForm = (data = cardData) => render(<FormWrapper {...data} />);

describe('SelectedCardForm', () => {
  beforeEach(() => {
    (useUserAccounts as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [
        {
          value: '1',
          label: '1234567890',
          secondaryLabel: 'PLN 100,00',
        },
      ],
    });
  });

  it('renders correctly with card data', () => {
    renderForm();
    expect(screen.getByText(cardData.cardName)).toBeInTheDocument();
  });

  it('renders account select if card is not free', () => {
    renderForm();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('does not render account select if card is free', () => {
    renderForm({ ...cardData, issueFee: 0 });
    expect(screen.queryByRole('combobox')).toBeNull();
  });

  it('has disabled confirmation Switch until user clicks on the link', () => {
    renderForm();
    clickOnSwitch();
  });

  it('has disabled confirmation button until user confirms terms and conditions and selects a payment account', () => {
    renderForm();

    const confirmBtn = screen.getByTestId('confirm-btn');

    expect(confirmBtn).toBeDisabled();
    clickOnSwitch();
    selectAccount();
    expect(confirmBtn).toBeEnabled();
  });

  it('confirmation button has "Issue Card" text if card is free', () => {
    renderForm({ ...cardData, issueFee: 0 });
    expect(screen.getByTestId('confirm-btn')).toHaveTextContent(
      translations.issueCard,
    );
  });

  it('confirmation button has "Confirm" text if card is not free', () => {
    renderForm();
    expect(screen.getByTestId('confirm-btn')).toHaveTextContent(
      translations.confirm,
    );
  });
});
