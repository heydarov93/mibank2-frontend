import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { Header } from './Header';

import { useGetUserInfoQuery } from 'api/userInfoApi';
import { theme } from 'theme/theme';

const initialValues = {
  auth: {
    isVerifying: false,
    verifyingTimer: 0,
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

jest.mock('api/userInfoApi', () => ({
  useGetUserInfoQuery: jest.fn().mockReturnValue({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      status: '0',
      isBlocked: null,
    },
    isLoading: false,
  }),
}));

const renderHeader = () =>
  render(
    <ThemeProvider theme={theme}>
      <Provider store={mockStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    </ThemeProvider>,
  );

describe('Header component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGetUserInfoQuery as jest.Mock).mockReturnValue({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        status: '0',
        isBlocked: null,
      },
      isLoading: false,
    });
  });

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
