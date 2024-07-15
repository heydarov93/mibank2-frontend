import { createTheme, ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { PersonalMenu } from './PersonalMenu';

import { useAppSelector } from 'hooks/hook';

jest.mock('store/reducers/AuthSlice', () => ({
  ...jest.requireActual('store/reducers/AuthSlice'),
  logoutFromApp: jest.fn().mockReturnValue({ type: 'Auth/logoutFromApp' }),
}));

const theme = createTheme();

const initialValues = {
  auth: {
    isAuth: true,
    user: { firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    error: null,
    loading: false,
  },
};

const mockStore = configureStore({
  reducer: () => initialValues,
});

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

jest.mock('hooks/hook', () => ({
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
jest.mock('hooks/hook', () => ({
  useAppSelector: jest.fn().mockReturnValue({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  }),
  useAppDispatch: () => mockDispatch,
}));

describe('PersonalMenu component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <PersonalMenu />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>,
    );

    const personalMenu = screen.getByTestId('personal-menu');
    expect(personalMenu).toBeInTheDocument();
  });

  it('handles settings button click', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const { getByLabelText } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <PersonalMenu />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(getByLabelText('settings'));
    expect(consoleSpy).toHaveBeenCalledWith('Open settings');

    consoleSpy.mockRestore();
  });

  it('handles logout button click', () => {
    const logoutFromApp = jest.fn();
    const localStorageSpy = jest
      .spyOn(Storage.prototype, 'clear')
      .mockImplementation();

    const { getByLabelText } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <PersonalMenu />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>,
    );

    fireEvent.click(getByLabelText('logout'));
    expect(mockDispatch).toHaveBeenCalledWith(logoutFromApp());
    expect(mockNavigate).toHaveBeenCalledWith('/signin');
    expect(localStorageSpy).toHaveBeenCalled();

    localStorageSpy.mockRestore();
  });

  it('does not render UserCard when user is undefined', () => {
    (useAppSelector as jest.Mock).mockReturnValue(null);

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <PersonalMenu />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>,
    );

    const userCard = screen.queryByText('John Doe');
    expect(userCard).not.toBeInTheDocument();
  });
});
