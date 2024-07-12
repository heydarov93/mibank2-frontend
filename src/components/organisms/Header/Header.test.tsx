/* eslint-disable @typescript-eslint/no-empty-function */
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

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
      t: (str: string) => {
        switch (str) {
          case 'header.logoTitle':
            return 'Millennium Bank';
          default:
            return str;
        }
      },
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

describe('Header component', () => {
  it('renders without crashing', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );
  });

  it('renders the logo', async () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the navigation menu', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );
    const navMenu = screen.getByTestId('nav-menu');
    expect(navMenu).toBeInTheDocument();
  });

  it('renders the personal menu', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );
    const personalMenu = screen.getByTestId('personal-menu');
    expect(personalMenu).toBeInTheDocument();
  });

  it('renders the drawer', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );
    const drawer = screen.getByTestId('drawer');
    expect(drawer).toBeInTheDocument();
  });

  it('link to homepage works correctly', () => {
    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>,
    );
    const homeLink = screen.getByRole('link', { name: /logo/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
