import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';

import { ForgotPasswordPage } from './ForgotPasswordPage';

import { authApi } from 'api/authApi';
import { contactInfoApi } from 'api/contactInfoApi';
import { userInfoApi } from 'api/userInfoApi';

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

jest.mock('utils', () => {
  return {
    generateRandomParam: jest.fn().mockReturnValue(''),
    handleLockedError: jest.fn(),
    useErrorHandlers: jest.fn,
    localTokenHandler: {
      getToken: jest.fn(),
    },
    formatPhoneNumber: jest.fn().mockReturnValue('(123) 456-7890'),
  };
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Forgot password Finished should match snapshot', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ForgotPasswordPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('navigate to signin page when click on back button', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ForgotPasswordPage />,
        </MemoryRouter>
      </Provider>,
    );
    const backButton = screen.getByRole('button', { name: 'RegistrationPage.buttonBackArrow' });
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/signin');
  });
});
