import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { CreateForgotPasswordForm } from './CreateForgotPasswordForm';

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

describe('Create Forgot password form should match snapshot', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CreateForgotPasswordForm />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should show error message when password and confirm message dont match', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CreateForgotPasswordForm />,
        </MemoryRouter>
      </Provider>,
    );
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    waitFor(() => {
      userEvent.type(passwordInput, 'Test@005');
      userEvent.type(confirmPasswordInput, 'Test@006');
    });

    waitFor(() => {
      fireEvent.blur(confirmPasswordInput);
    });

    const errorMessage = await screen.findByText(
      `Passwords don't match. Please check it and try again`,
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('confirm button should be disabled if required fields are empty', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CreateForgotPasswordForm />,
        </MemoryRouter>
      </Provider>,
    );
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const verificationCodeInput = screen.getByLabelText(
      'Enter verification code',
    );
    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    waitFor(() => {
      userEvent.type(passwordInput, '');
      userEvent.type(confirmPasswordInput, '');
      userEvent.type(verificationCodeInput, '');
    });

    expect(confirmButton).toBeDisabled();
  });

  it('should show error message when alphabet entered in Verification input field', async () => {
    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CreateForgotPasswordForm />,
        </MemoryRouter>
      </Provider>,
    );
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const verificationCodeInput = screen.getByLabelText(
      'Enter verification code',
    );

    waitFor(() => {
      userEvent.type(passwordInput, 'Test@005');
      userEvent.type(confirmPasswordInput, 'Test@005');
      userEvent.type(verificationCodeInput, '123abc');
    });

    waitFor(() => {
      fireEvent.blur(verificationCodeInput);
    });
    const verificationCodeErrorMessage = await screen.findByText(
      `Only digits can be entered into the field. Please, try again`,
    );
    expect(verificationCodeErrorMessage).toBeInTheDocument();
  });
});
