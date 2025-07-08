import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { SignInPage } from './SignInPage';

import { contactsApi } from 'api';
import { userAccountsApi } from 'api/services/user-account-service/user-accounts.api';
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
    [userAccountsApi.reducerPath]: userAccountsApi.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userAccountsApi.middleware,
      contactsApi.middleware,
    ]),
});

jest.mock('utils/auth', () => ({
  localTokenHandler: {
    getToken: jest.fn(),
  },
  sessionTokenHandler: {
    getToken: jest.fn(),
  },
}));

jest.mock('utils/formatters/phoneFormatter', () => ({
  formatPhoneNumber: jest.fn().mockReturnValue('(123) 456-7890'),
}));

jest.mock('utils/helpers/randomHelpers', () => ({
  generateRandomParam: jest.fn().mockReturnValue(''),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ThemeProvider theme={theme}>
            <SignInPage />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
