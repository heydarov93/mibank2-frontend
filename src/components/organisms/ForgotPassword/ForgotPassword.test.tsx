import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, useNavigate } from 'react-router-dom';

import { ForgotPassword } from './ForgotPassword';

import { useGetCodeForForgotPasswordMutation } from 'api/services/user-account-service/user-accounts.api';
import { useAppDispatch } from 'hooks';
import { setEmail } from 'store/slices/auth/AuthSlice';

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

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('hooks', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('api/services/user-account-service/user-accounts.api', () => ({
  useGetCodeForForgotPasswordMutation: jest.fn(),
}));

jest.mock('store/slices/auth', () => ({
  setError: jest.fn(),
  setEmail: jest.fn(),
}));

jest.mock('hooks', () => ({
  useAppDispatch: jest.fn(),
}));

describe('Forgot Password should match snapshot', () => {
  const mockNavigate = jest.fn();
  const mockDispatch = jest.fn();
  const mockGetCodeForForgotPassword = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useGetCodeForForgotPasswordMutation as jest.Mock).mockReturnValue([
      mockGetCodeForForgotPassword,
    ]);
  });

  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ForgotPassword />,
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show error email message', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ForgotPassword />
        </MemoryRouter>
      </Provider>,
    );
    const emailInput = screen.getByLabelText('LoginPage.email.label');
    const button = screen.getByRole('button', {
      name: 'ForgotPassword.EmailPageButton',
    });

    waitFor(() => {
      userEvent.type(emailInput, 'BAD_EMAIL');
    });

    waitFor(() => {
      fireEvent.blur(emailInput);
    });

    const errorMessage = await screen.findByText(
      'Please enter your email in format: example@gmail.com',
    );
    expect(button).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });

  it('should call handleSubmit with valid data and navigate to the next page', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <ForgotPassword />
        </MemoryRouter>
      </Provider>,
    );

    const emailInput = screen.getByLabelText('LoginPage.email.label');
    const submitButton = screen.getByRole('button', {
      name: 'ForgotPassword.EmailPageButton',
    });

    waitFor(() => {
      userEvent.type(emailInput, 'test@example.com');
    });

    await fireEvent.click(submitButton);

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        setEmail({ email: 'test@example.com' }),
      );
      expect(mockNavigate).toHaveBeenCalledWith('/create-forgot-password');
    });
  });
});
