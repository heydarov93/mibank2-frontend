import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import BackOfficeViewProductsPage from './BackOfficeViewProductsPage';

import { getDepositsApi } from 'api/getDepositsApi';
import BackOfficeTable from 'components/organisms/BackOfficeTable/BackOfficeTable';

const mockDataForTable = [
  {
    id: 1,
    productName: 'Card',
    productSubtype: 'Type',
    cardDescription: 'Desctiption',
    cardCurrency: 'USD',
    minimumDepositSum: '1',
    maximumDepositSum: '2',
    depositTerm: 'term',
    depositInterestRate: '12',
    depositCapitalizationRate: '12',
    earlyWithdrawalLimit: '12',
    withdrawalFee: '12',
  },
];
const mockStore = configureStore({
  reducer: {
    [getDepositsApi.reducerPath]: getDepositsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(getDepositsApi.middleware),
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

test('Table is in the documet', () => {
  render(<BackOfficeTable tableBody={mockDataForTable} tableHead={[]} />);
  const table = screen.getByRole('table');
  expect(table).toBeInTheDocument();
});

test('Renders table and mathces the snapshot', () => {
  const { asFragment } = render(
    <BackOfficeTable tableBody={mockDataForTable} tableHead={[]} />,
  );

  expect(screen.getByRole('table')).toBeInTheDocument();

  expect(asFragment()).toMatchSnapshot();
});

test('Renders the first filter box', () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <BackOfficeViewProductsPage />
      </MemoryRouter>
    </Provider>,
  );
  const filter = screen.getByText('header.products');
  expect(filter).toBeInTheDocument();
});

test('Renders the second filter box', () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <BackOfficeViewProductsPage />
      </MemoryRouter>
    </Provider>,
  );
  const filter = screen.getByText('header.productSubtypes');
  expect(filter).toBeInTheDocument();
});

test('Renders the search field', () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <BackOfficeViewProductsPage />
      </MemoryRouter>
    </Provider>,
  );
  const searchField = screen.getByPlaceholderText('header.searchProducts');
  expect(searchField).toBeInTheDocument();
});

test('Renders the headers', () => {
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <BackOfficeViewProductsPage />
      </MemoryRouter>
    </Provider>,
  );
  const header1 = screen.getByText('header.finProducts');
  const header2 = screen.getByText('header.viewProducts');
  expect(header1).toBeInTheDocument();
  expect(header2).toBeInTheDocument();
});
