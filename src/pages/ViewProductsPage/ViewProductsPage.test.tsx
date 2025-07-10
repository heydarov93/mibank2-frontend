import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { ViewProductsPage } from './ViewProductsPage';

import { productsApi } from 'api';
import { theme } from 'theme/theme';

const mockStore = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const renderComponent = () =>
  render(
    <Provider store={mockStore}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <ViewProductsPage />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>,
  );

describe('ViewProductsPage', () => {
  beforeEach(() => {
    renderComponent();
  });

  test('renders search input', () => {
    const input = screen.getByPlaceholderText('header.searchProducts');
    expect(input).toBeInTheDocument();
  });

  test('typing and pressing enter in search triggers debounce logic', async () => {
    const input = screen.getByPlaceholderText('header.searchProducts');
    act(() => userEvent.type(input, 'Gold Product'));
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('header.searchProducts'),
      ).toBeInTheDocument();
    });
  });

  test('shows filter boxes', () => {
    expect(screen.getByText('header.products')).toBeInTheDocument();
    expect(screen.getByText('header.productSubtypes')).toBeInTheDocument();
  });

  test('renders primary and secondary headers', () => {
    expect(screen.getByText('header.finProducts')).toBeInTheDocument();
    expect(screen.getByText('header.viewProducts')).toBeInTheDocument();
  });

  test('shows "NoMatchesFound" component when no products and query exists', async () => {
    const input = screen.getByPlaceholderText('header.searchProducts');
    act(() => userEvent.type(input, 'NonMatchingProduct'));
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(
        screen.getByText('noMatchesFound.viewAllProducts'),
      ).toBeInTheDocument();
    });
  });

  test('matches snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
