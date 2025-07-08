import {
  act,
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';

import { IssueCardModal } from './IssueCardModal';

import { useLazySearchCardsQuery } from 'api/services/card-service/cards.api';
import { useGetAccountOptions } from 'hooks/useGetAccountOptions';
import store from 'store';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('api/services/card-service/cards.api', () => ({
  ...jest.requireActual('api/services/card-service/cards.api'),
  useLazySearchCardsQuery: jest.fn(),
}));

jest.mock('hooks/useGetAccountOptions', () => ({
  useGetAccountOptions: jest.fn(),
}));

const selectAllValues = async () => {
  for (const select of screen.getAllByRole('combobox')) {
    await act(() => fireEvent.mouseDown(select));

    const listbox = screen.getByRole('listbox');
    const firstOption = listbox.querySelector('li') as HTMLElement;

    await act(() => fireEvent.click(firstOption));
  }
};

const selectCard = async () => {
  const firstCard = screen.queryAllByTestId(
    'small-issuance-card',
  )[0] as HTMLElement;

  await act(() => fireEvent.click(firstCard));
};

describe('IssueCardModal', () => {
  let rerender: RenderResult['rerender'];

  beforeEach(() => {
    (useLazySearchCardsQuery as jest.Mock).mockReturnValue([
      jest.fn(() => Promise.resolve()),
      {
        data: {
          data: [
            {
              id: 1,
              cardName: 'Home',
              cardCurrency: 'USD',
              cardType: 'Digital   ',
              cashbackRate: 1,
              dailyLimit: 10000,
              issueType: null,
              cardIssuer: 'Visa',
              issueFee: null,
              issueCurrency: 'PLN',
              foreignTransactionLimit: 100000000,
              monthlyFee: 10,
              cardStatus: 'ACTIVE',
            },
          ],
        },
        isLoading: false,
      },
    ]);
    (useGetAccountOptions as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [
        {
          value: '1',
          label: '1234567890',
          secondaryLabel: 'PLN 100,00',
        },
      ],
    });
    rerender = render(
      <Provider store={store}>
        <IssueCardModal open onClose={jest.fn()} />
      </Provider>,
    ).rerender;
  });

  it('renders the form when open is true', () => {
    expect(screen.getByTestId('issue-card-modal')).toBeInTheDocument();
  });

  it("doesn't render the form when open is false", async () => {
    rerender(
      <Provider store={store}>
        <IssueCardModal open={false} onClose={jest.fn()} />
      </Provider>,
    );
    await waitFor(() =>
      expect(screen.queryByTestId('issue-card-modal')).toBeNull(),
    );
  });

  it('has disabled "Continue" button if all fields are not filled', () => {
    expect(
      screen.getByTestId('issue-card-modal-continue-button'),
    ).toBeDisabled();
  });

  it('displays available cards when all fields are filled with disabled "Continue" button', async () => {
    await selectAllValues();

    expect(
      screen.getByTestId('issue-card-modal-continue-button'),
    ).toBeDisabled();
    expect(
      screen.getByTestId('issue-card-modal-cards-selection'),
    ).toBeInTheDocument();
  });

  it('makes "Continue" button enabled and renders information about selected card if all fields are filled and card is selected', async () => {
    await selectAllValues();

    expect(
      screen.queryByTestId('issue-card-modal-selected-card-info'),
    ).toBeNull();

    await selectCard();

    expect(
      screen.getByTestId('issue-card-modal-selected-card-info'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('issue-card-modal-continue-button'),
    ).toBeEnabled();
  });

  it('renders "SelectedCardForm" if user clicks "Continue" button', async () => {
    await selectAllValues();
    await selectCard();

    fireEvent.click(screen.getByTestId('issue-card-modal-continue-button'));

    expect(screen.getByTestId('selected-card-form')).toBeInTheDocument();
  });
});
