import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { SignupFormPassword } from './SignupFormPassword';

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

jest.mock('utils', () => {
  return {
    generateRandomParam: jest.fn().mockReturnValue(''),
    handleNotFoundError: jest.fn(),
    handleLockedError: jest.fn(),
    useErrorHandlers: jest.fn,
    formatErrorMessage: jest.fn(),
    useFormatErrorMessage: jest.fn,
    localTokenHandler: {
      getToken: jest.fn(),
    },
  };
});

const mockNavigate = jest.fn();
jest.mock('react-router', () => {
  return {
    useNavigate: () => mockNavigate,
  };
});

describe('SignupFormPassword', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <SignupFormPassword />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should enable the submit button only when the form is valid', async () => {
    render(
      <Provider store={mockStore}>
        <SignupFormPassword />
      </Provider>,
    );

    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password');
    const submitButton = screen.getByText('Sign Up');

    expect(submitButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'validPassword!123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'validPassword!123' },
    });

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
    });
  });
});
