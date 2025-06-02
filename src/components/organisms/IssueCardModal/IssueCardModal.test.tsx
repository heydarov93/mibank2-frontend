import {
  fireEvent,
  render,
  RenderResult,
  screen,
  waitFor,
} from '@testing-library/react';

import { IssueCardModal } from './IssueCardModal';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const selectAllValues = () =>
  screen.getAllByRole('combobox').forEach((select) => {
    fireEvent.mouseDown(select);

    const listbox = screen.getByRole('listbox');
    const firstOption = listbox.querySelector('li') as HTMLElement;

    fireEvent.click(firstOption);
  });

const selectCard = () => {
  const firstCard = screen.queryAllByTestId(
    'small-issuance-card',
  )[0] as HTMLElement;

  fireEvent.click(firstCard);
};

describe('IssueCardModal', () => {
  let rerender: RenderResult['rerender'];

  beforeEach(() => {
    rerender = render(<IssueCardModal open onClose={jest.fn()} />).rerender;
  });

  it('renders the form when open is true', () => {
    expect(screen.getByTestId('issue-card-modal')).toBeInTheDocument();
  });

  it("doesn't render the form when open is false", async () => {
    rerender(<IssueCardModal open={false} onClose={jest.fn()} />);
    await waitFor(() =>
      expect(screen.queryByTestId('issue-card-modal')).toBeNull(),
    );
  });

  it('has disabled "Continue" button if all fields are not filled', () => {
    expect(
      screen.getByTestId('issue-card-modal-continue-button'),
    ).toBeDisabled();
  });

  it('displays available cards when all fields are filled with disabled "Continue" button', () => {
    selectAllValues();

    expect(
      screen.getByTestId('issue-card-modal-continue-button'),
    ).toBeDisabled();
    expect(
      screen.getByTestId('issue-card-modal-cards-selection'),
    ).toBeInTheDocument();
  });

  it('makes "Continue" button enabled and renders information about selected card if all fields are filled and card is selected', () => {
    selectAllValues();

    expect(
      screen.queryByTestId('issue-card-modal-selected-card-info'),
    ).toBeNull();

    selectCard();

    expect(
      screen.getByTestId('issue-card-modal-selected-card-info'),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('issue-card-modal-continue-button'),
    ).toBeEnabled();
  });

  it('renders "SelectedCardForm" if user clicks "Continue" button', () => {
    selectAllValues();
    selectCard();

    fireEvent.click(screen.getByTestId('issue-card-modal-continue-button'));

    expect(screen.getByTestId('selected-card-form')).toBeInTheDocument();
  });
});
