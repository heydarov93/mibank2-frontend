import { configureStore } from '@reduxjs/toolkit';
import { render, screen, fireEvent } from '@testing-library/react';
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

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

describe('Create Forgot password form', () => {
  let container: HTMLElement;

  beforeEach(() => {
    const rendered = render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <CreateForgotPasswordForm />
        </MemoryRouter>
      </Provider>,
    );
    container = rendered.container;
  });

  it('snapshot should match', () => {
    expect(container).toMatchSnapshot();
  });

  it('confirm button should be disabled when passwords dont match', async () => {
    const passwordInput = screen.getByLabelText('mainLabel');
    const confirmPasswordInput = screen.getByLabelText('confirmLabel');
    const submitButton = screen.getByTestId('save-button');

    userEvent.type(passwordInput, 'Test@005');
    userEvent.type(confirmPasswordInput, 'Test@006');

    expect(submitButton).toBeDisabled();
  });

  it('confirm button should be disabled if required fields are empty', async () => {
    const passwordInput = screen.getByLabelText('mainLabel');
    const confirmPasswordInput = screen.getByLabelText('confirmLabel');
    const verificationCodeInput = screen.getByLabelText('EnterVerificatonCode');
    const submitButton = screen.getByTestId('save-button');

    userEvent.type(passwordInput, '');
    userEvent.type(confirmPasswordInput, '');
    userEvent.type(verificationCodeInput, '');

    expect(submitButton).toBeDisabled();
  });

  it('should show error message when alphabet entered in Verification input field', async () => {
    const passwordInput = screen.getByLabelText('mainLabel');
    const confirmPasswordInput = screen.getByLabelText('confirmLabel');
    const verificationCodeInput = screen.getByLabelText('EnterVerificatonCode');

    userEvent.type(passwordInput, 'Test@005');
    userEvent.type(confirmPasswordInput, 'Test@005');
    userEvent.type(verificationCodeInput, '123abc');

    fireEvent.blur(verificationCodeInput);
    const verificationCodeErrorMessage = await screen.findByText((text) =>
      text.includes('Only digits can be entered into the field.'),
    );

    expect(verificationCodeErrorMessage).toBeInTheDocument();
  });
});
