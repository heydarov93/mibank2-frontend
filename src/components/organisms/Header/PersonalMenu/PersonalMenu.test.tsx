import { createTheme, ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { PersonalMenu } from './PersonalMenu';

import { useGetUserInfoQuery } from 'api/userInfoApi';
import { useAppSelector } from 'hooks';
import { TokenType } from 'models/IAuth';
import { logoutFromApp } from 'store/reducers/AuthSlice';
import { localTokenHandler } from 'utils';

jest.mock('store/reducers/AuthSlice', () => ({
  ...jest.requireActual('store/reducers/AuthSlice'),
  logoutFromApp: jest.fn().mockReturnValue({ type: 'Auth/logoutFromApp' }),
}));

const theme = createTheme();

const initialValues = {
  auth: {
    isVerifying: false,
    verifyingTimer: 0,
    user: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      status: '0',
      isBlocked: null,
    },
    error: null,
    loading: false,
  },
};

const mockStore = configureStore({
  reducer: () => initialValues,
});

jest.mock('utils', () => ({
  localTokenHandler: {
    clearToken: jest.fn(),
    storeToken: jest.fn(),
    getToken: jest.fn(),
  },
}));

jest.mock('models/IAuth', () => ({
  TokenType: {
    ACCESS: 'ACCESS',
  },
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('hooks', () => ({
  useAppSelector: jest.fn().mockReturnValue({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  }),
  useAppDispatch: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock('store/selectors/AuthSelectors', () => ({
  getUser: () => ({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  }),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockDispatch = jest.fn();
jest.mock('hooks', () => ({
  useAppSelector: jest.fn().mockReturnValue({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  }),
  useAppDispatch: () => mockDispatch,
}));

jest.mock('api/userInfoApi', () => ({
  useGetUserInfoQuery: jest.fn().mockReturnValue({
    data: undefined,
    isLoading: false,
  }),
}));

const renderComponent = () =>
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <PersonalMenu />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>,
  );

describe('PersonalMenu component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'email') {
        return 'john@example.com';
      }
      return null;
    });
    jest.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {});
  });

  it('renders without crashing', () => {
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

    renderComponent();
    const personalMenu = screen.getByTestId('personal-menu');
    expect(personalMenu).toBeInTheDocument();
  });

  it('handles settings button click', () => {
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
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const { getByLabelText } = renderComponent();

    fireEvent.click(getByLabelText('settings'));
    expect(consoleSpy).toHaveBeenCalledWith('Open settings');
    consoleSpy.mockRestore();
  });

  it('handles logout button click', () => {
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
    const { getByLabelText } = renderComponent();
    fireEvent.click(getByLabelText('logout'));
    expect(mockDispatch).toHaveBeenCalledWith(logoutFromApp());
    expect(localTokenHandler.clearToken).toHaveBeenCalledWith(TokenType.ACCESS);
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('isAuth');
    expect(Storage.prototype.removeItem).toHaveBeenCalledWith('email');
    expect(mockNavigate).toHaveBeenCalledWith('/signin');
  });

  it('does not render UserCard when user is undefined', () => {
    (useGetUserInfoQuery as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
    });
    (useAppSelector as jest.Mock).mockReturnValue(null);

    renderComponent();

    const userCard = screen.queryByText('John Doe');
    expect(userCard).not.toBeInTheDocument();
  });
});
