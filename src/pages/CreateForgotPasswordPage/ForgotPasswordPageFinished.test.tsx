import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useNavigate, MemoryRouter } from 'react-router-dom';

import { ForgotPasswordPageFinished } from './ForgotPasswordPageFinished';

import { authApi } from 'api/authApi';
import { contactInfoApi } from 'api/contactInfoApi';
import { userInfoApi } from 'api/userInfoApi';
import { theme } from 'theme/theme';

const initialValues = {
  auth: {
    isAuth: false,
    user: null,
    error: null,
    loading: false,
  },
  contacts: {
    info: {
      id: 0,
      email: '',
      phoneNumber: '',
      contactCenterWorkingDays: '',
      contactCenterShortenedDays: '',
      contactCenterWorkingDayBeginTime: '',
      contactCenterWorkingDayEndTime: '',
      contactCenterShortenedDayBeginTime: '',
      contactCenterShortenedDayEndTime: '',
    },
  },
};

const mockStore = configureStore({
  reducer: {
    auth: (state = initialValues.auth) => state,
    contacts: (state = initialValues.contacts) => state,
    [authApi.reducerPath]: authApi.reducer,
    [userInfoApi.reducerPath]: userInfoApi.reducer,
    [contactInfoApi.reducerPath]: contactInfoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userInfoApi.middleware,
      contactInfoApi.middleware,
    ]),
});

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('utils/auth', () => ({
  handleLockedError: jest.fn(),
  useErrorHandlers: jest.fn,
  localTokenHandler: {
    getToken: jest.fn(),
  },
  formatPhoneNumber: jest.fn().mockReturnValue('(123) 456-7890'),
}));

jest.mock('utils/helpers/randomHelpers', () => ({
  generateRandomParam: jest.fn().mockReturnValue(''),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const renderComponent = () =>
  render(
    <Provider store={mockStore}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ForgotPasswordPageFinished />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>,
  );

describe('ForgotPasswordPageFinished', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should navigate to signin page on back button click', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    renderComponent();
    fireEvent.click(
      screen.getByRole('button', {
        name: 'RegistrationPage.buttonBackArrow',
      }),
    );
    expect(mockNavigate).toHaveBeenCalledWith('/signin');
  });

  it('should navigate to signin page on login link click', () => {
    renderComponent();
    const loginLink = screen.getByRole('link', {
      name: 'SignupPage.moveToLoginLink',
    });
    expect(loginLink).toHaveAttribute('href', '/signin');
  });
});
