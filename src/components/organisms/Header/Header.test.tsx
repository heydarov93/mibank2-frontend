import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { Header } from './Header';

const initialValues = {
  auth: {
    isAuth: false,
    user: null,
    error: null,
    loading: false,
  },
};

const mockStore = configureStore({
  reducer: () => initialValues,
});

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

const renderHeader = () =>
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>,
  );

describe('Header component', () => {
  it('snapshot should match', () => {
    const { asFragment } = renderHeader();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    renderHeader();
  });

  it('renders essential elements', () => {
    renderHeader();
    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('nav-menu')).toBeInTheDocument();
    expect(screen.getByTestId('personal-menu')).toBeInTheDocument();
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
  });

  it('link to homepage works correctly', () => {
    renderHeader();
    const homeLink = screen.getByRole('link', { name: /logo/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
