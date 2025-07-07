import { ThemeProvider } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useNavigate, MemoryRouter } from 'react-router-dom';

import { CreateForgotPasswordPage } from './CreateForgotPasswordPage';

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
  initReactI18next: { type: '3rdParty' },
}));

jest.mock('utils/auth', () => ({
  handleLockedError: jest.fn(),
  localTokenHandler: { getToken: jest.fn() },
}));

jest.mock('utils/helpers/randomHelpers', () => ({
  generateRandomParam: jest.fn().mockReturnValue(''),
}));

jest.mock('utils/formatters/phoneFormatter', () => ({
  formatPhoneNumber: jest.fn().mockReturnValue('(123) 456-7890'),
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
          <CreateForgotPasswordPage />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>,
  );

describe('CreateForgotPasswordPage', () => {
  it('should match snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should navigate back when back button is clicked', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    renderComponent();
    const backButton = screen.getByRole('button', {
      name: 'RegistrationPage.buttonBackArrow',
    });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
