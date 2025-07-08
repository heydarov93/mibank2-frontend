import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import dayjs from 'dayjs';

import { useTransferFilters } from '../../hooks/useTransferFilters';

import { TransferFilters } from './TransferFilters';

import { SelectFieldOption } from 'components/molecules';
import { ETransactionType } from 'enums/ETransactionType';
import { ETransferTime } from 'enums/ETransferTime';
import { TransactionFiltersFormValues } from 'validation/validationTransactionFilters';

jest.mock('../../hooks/useTransferFilters', () => ({
  useTransferFilters: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const availableFilters = {
  card: [
    {
      value: 'All cards',
    },
    {
      value: 'Strong Card **** 5678',
    },
    {
      value: 'Strong Card **** 1234',
    },
  ],
  template: [
    { value: 'All templates' },
    { value: 'Template 1' },
    { value: 'Template 2' },
    { value: 'Template 3' },
    { value: 'Template 4' },
  ],
  time: [
    {
      label: 'Last 7 days',
      value: ETransferTime.LAST_7_DAYS,
    },
    {
      label: 'Last 30 days',
      value: ETransferTime.LAST_30_DAYS,
    },
    {
      label: 'All time',
      value: ETransferTime.ALL_TIME,
    },
    {
      label: 'Custom',
      value: ETransferTime.CUSTOM,
      preventClosing: true,
      renderMenuExtender: ({ onClose }) => (
        <div onClick={onClose} data-testid="menu-extender">
          Menu extender
        </div>
      ),
    },
  ],
  transactionsType: [
    {
      label: 'All',
      value: ETransactionType.ALL,
    },
    {
      label: 'Income',
      value: ETransactionType.INCOME,
    },
    {
      label: 'Expense',
      value: ETransactionType.EXPENSE,
    },
  ],
} satisfies Record<string, SelectFieldOption[]>;

const defaultFilters = {
  time: ETransferTime.LAST_7_DAYS,
  card: [availableFilters.card[0].value],
  template: availableFilters.template[0].value,
  transactionsType: [ETransactionType.ALL],
  startDate: dayjs().subtract(7, 'day').toDate(),
  endDate: new Date(),
} satisfies TransactionFiltersFormValues;

const getFilter = (testId: string) =>
  screen.getByTestId(testId).querySelector('[role="combobox"]') as HTMLElement;
const getFilterInput = (testId: string) =>
  screen.getByTestId(testId).querySelector('input') as HTMLInputElement;
const getClearFiltersButton = () => screen.getByTestId('clear-filters-button');

const getFilters = () => ({
  selects: {
    time: getFilter('time-filter'),
    card: getFilter('card-filter'),
    template: getFilter('template-filter'),
    transactionsType: getFilter('transactions-type-filter'),
  },
  inputs: {
    time: getFilterInput('time-filter'),
    card: getFilterInput('card-filter'),
    template: getFilterInput('template-filter'),
    transactionsType: getFilterInput('transactions-type-filter'),
  },
});

const selectValue = (select: HTMLElement, valueIndex: number) => {
  act(() => fireEvent.mouseDown(select));

  const listbox = screen.getByRole('listbox');
  const options = listbox.querySelectorAll('li');

  act(() => {
    fireEvent.click(options[valueIndex]);
    jest.useFakeTimers();
  });
};

const selectValues = (valueIndex = 1) => {
  const { selects } = getFilters();
  selectValue(selects.time, valueIndex);
  selectValue(selects.card, valueIndex);
  selectValue(selects.template, valueIndex);
  selectValue(selects.transactionsType, valueIndex);
};

describe('TransferFilters', () => {
  beforeEach(() => {
    (useTransferFilters as jest.Mock).mockReturnValue({
      availableFilters,
      defaultFilters,
      isLoading: false,
      isError: false,
      error: null,
    });
    render(<TransferFilters />);
  });

  it('renders with default values selected', () => {
    const { time, card, template, transactionsType } = getFilters().inputs;

    expect(time).toHaveValue(defaultFilters.time);
    expect(card).toHaveValue(defaultFilters.card);
    expect(template).toHaveValue(defaultFilters.template);
    expect(transactionsType).toHaveValue(defaultFilters.transactionsType);
  });

  it('allows to select different filters', async () => {
    const valueIndex = 1;
    const timeValue = availableFilters.time[valueIndex].value;
    const cardValue = availableFilters.card[valueIndex].value;
    const templateValue = availableFilters.template[valueIndex].value;
    const transactionsTypeValue =
      availableFilters.transactionsType[valueIndex].value;

    await selectValues(valueIndex);
    const { inputs } = getFilters();

    expect(inputs.time).toHaveValue(timeValue);
    expect(inputs.card).toHaveValue(cardValue);
    expect(inputs.template).toHaveValue(templateValue);
    expect(inputs.transactionsType).toHaveValue(transactionsTypeValue);
  });

  it('has disabled "Clear filters" button when default values are selected', () => {
    expect(getClearFiltersButton()).toBeDisabled();
  });

  it('has enabled "Clear filters" button when different filters are selected', () => {
    selectValues();
    expect(getClearFiltersButton()).toBeEnabled();
  });

  it('allows to clear filters to default values by clicking on "Clear filters" button', () => {
    selectValues();
    const { inputs } = getFilters();

    expect(inputs.time).not.toHaveValue(defaultFilters.time);
    expect(inputs.card).not.toHaveValue(defaultFilters.card);
    expect(inputs.template).not.toHaveValue(defaultFilters.template);
    expect(inputs.transactionsType).not.toHaveValue(
      defaultFilters.transactionsType,
    );

    act(() => fireEvent.click(getClearFiltersButton()));

    expect(inputs.time).toHaveValue(defaultFilters.time);
    expect(inputs.card).toHaveValue(defaultFilters.card);
    expect(inputs.template).toHaveValue(defaultFilters.template);
    expect(inputs.transactionsType).toHaveValue(
      defaultFilters.transactionsType,
    );
  });

  it('renders "menu extender" when selecting "custom" option in date filter', () => {
    const { selects } = getFilters();
    selectValue(
      selects.time,
      availableFilters.time.findIndex(
        (el) => el.value === ETransferTime.CUSTOM,
      ),
    );

    expect(screen.getByRole('listbox')).toBeVisible();
    expect(screen.getByTestId('menu-extender')).toBeVisible();
  });

  it('allows "menu extender" to close select menu', async () => {
    const { selects } = getFilters();
    selectValue(
      selects.time,
      availableFilters.time.findIndex(
        (el) => el.value === ETransferTime.CUSTOM,
      ),
    );

    const menuExtender = screen.getByTestId('menu-extender');

    expect(screen.getByTestId('menu-extender')).toBeVisible();

    act(() => fireEvent.click(menuExtender));

    await waitFor(() =>
      expect(screen.queryByTestId('menu-extender')).toBeNull(),
    );
  });
});
