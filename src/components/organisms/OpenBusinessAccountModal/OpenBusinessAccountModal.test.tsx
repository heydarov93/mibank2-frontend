import {
  screen,
  fireEvent,
  RenderResult,
  render,
  waitFor,
  act,
} from '@testing-library/react';

import { OpenBusinessAccountModal } from './OpenBusinessAccountModal';

const translations = {
  title: 'title',
  editAddressTitle: 'editAddressTitle',
};

const DIGITAL_CARD_INDEX = 0;
const PLASTIC_CARD_INDEX = 1;

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: keyof typeof translations) => {
      return translations[key] ?? key;
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

const selectValue = async (select: HTMLElement, valueIndex: number) => {
  await act(() => fireEvent.mouseDown(select));

  const listbox = screen.getByRole('listbox');
  const options = listbox.querySelectorAll('li');

  await act(() => fireEvent.click(options[valueIndex]));
};

const selectAllValues = async () => {
  for (const select of screen.getAllByRole('combobox')) {
    await selectValue(select, 0);
  }
};

const selectDigitalCard = () =>
  selectValue(
    screen
      .getByTestId('card-type-select')
      .querySelector('[role="combobox"]') as HTMLElement,
    DIGITAL_CARD_INDEX,
  );

const selectPlasticCard = () =>
  selectValue(
    screen
      .getByTestId('card-type-select')
      .querySelector('[role="combobox"]') as HTMLElement,
    PLASTIC_CARD_INDEX,
  );

const clickOnAgreementLink = () =>
  act(() => fireEvent.click(screen.getByTestId('agreement-link')));

const getSwitchInput = () =>
  screen
    .getByTestId('switch-confirmation')
    .querySelector('input') as HTMLInputElement;

const clickOnTermsSwitch = () => act(() => fireEvent.click(getSwitchInput()));

const clickOnAddressSwitch = () =>
  act(() =>
    fireEvent.click(
      screen
        .getByTestId('switch-address-confirmation')
        .querySelector('input') as HTMLInputElement,
    ),
  );

const clickOnEditAddressBtn = () =>
  act(() => fireEvent.click(screen.getByTestId('edit-address-button')));

describe('OpenBusinessAccountModal', () => {
  let rerender: RenderResult['rerender'];

  beforeEach(() => {
    rerender = render(
      <OpenBusinessAccountModal open onClose={jest.fn()} />,
    ).rerender;
  });

  it('renders when open is true', () => {
    expect(screen.getByTestId('open-business-acc-modal')).toBeInTheDocument();
  });

  it("doesn't render when open is false", async () => {
    rerender(<OpenBusinessAccountModal open={false} onClose={jest.fn()} />);
    await waitFor(() =>
      expect(screen.queryByTestId('open-business-acc-modal')).toBeNull(),
    );
  });

  it('has disabled "Open Account" button if all fields are not filled', () => {
    expect(screen.getByTestId('open-acc-button')).toBeDisabled();
  });

  it('displays information about card without address when all fields are filled and "Digital" card type is selected', async () => {
    await selectAllValues();
    await selectDigitalCard();

    expect(screen.getByTestId('open-acc-button')).toBeDisabled();
    expect(screen.getByTestId('business-card-info')).toBeInTheDocument();
    expect(screen.queryByTestId('open-business-acc-address')).toBeNull();
  });

  it('displays information about card with address when all fields are filled and "Plastic" card type is selected', async () => {
    await selectAllValues();
    await selectPlasticCard();

    expect(screen.getByTestId('open-acc-button')).toBeDisabled();
    expect(screen.getByTestId('business-card-info')).toBeInTheDocument();
    expect(screen.getByTestId('open-business-acc-address')).toBeInTheDocument();
  });

  it('has disabled checkbox for terms agreement', async () => {
    await selectAllValues();

    const switchInput = getSwitchInput();

    expect(switchInput).toBeDisabled();
  });

  it('makes checkbox for terms agreement enabled when user clicks on the link', async () => {
    await selectAllValues();

    const switchInput = getSwitchInput();

    expect(switchInput).toBeDisabled();
    await clickOnAgreementLink();
    expect(switchInput).toBeEnabled();
  });

  it('makes "Open Account" button enabled when "Digital" card is selected and user agrees to terms', async () => {
    await selectAllValues();
    await selectDigitalCard();

    const openAccBtn = screen.getByTestId('open-acc-button');

    expect(openAccBtn).toBeDisabled();
    await clickOnAgreementLink();
    await clickOnTermsSwitch();
    expect(openAccBtn).toBeEnabled();
  });

  it('makes "Open Account" button enabled when "Plastic" card is selected and user confirms address and agrees to terms', async () => {
    await selectAllValues();
    await selectPlasticCard();

    const openAccBtn = screen.getByTestId('open-acc-button');

    expect(openAccBtn).toBeDisabled();
    await clickOnAddressSwitch();
    await clickOnAgreementLink();
    await clickOnTermsSwitch();
    expect(openAccBtn).toBeEnabled();
  });

  it('renders "EditCorporateAddressForm" when user clicks "Edit" button', async () => {
    await selectAllValues();
    await selectPlasticCard();
    await clickOnEditAddressBtn();

    expect(
      screen.getByTestId('edit-corporate-address-form'),
    ).toBeInTheDocument();
  });

  it('header does not have "Back" button when user is not editing address', () => {
    expect(screen.getByTestId('modal-header')).toHaveTextContent(
      translations.title,
    );
    expect(screen.queryByTestId('modal-header-back-button')).toBeNull();
  });

  it('header changes title and has "Back" button when user is editing address', async () => {
    await selectAllValues();
    await selectPlasticCard();
    await clickOnEditAddressBtn();

    expect(screen.getByTestId('modal-header')).toHaveTextContent(
      translations.editAddressTitle,
    );
    expect(screen.getByTestId('modal-header-back-button')).toBeInTheDocument();
  });

  it('opens "EditCorporateAddressForm" and returns back when user clicks on "Back" button', async () => {
    await selectAllValues();
    await selectPlasticCard();

    expect(screen.getByTestId('modal-header')).toHaveTextContent(
      translations.title,
    );

    await clickOnEditAddressBtn();

    expect(screen.getByTestId('modal-header')).toHaveTextContent(
      translations.editAddressTitle,
    );

    const backBtn = screen.getByTestId('modal-header-back-button');

    expect(backBtn).toBeInTheDocument();

    await act(() => fireEvent.click(backBtn));

    expect(screen.getByTestId('modal-header')).toHaveTextContent(
      translations.title,
    );
  });
});
