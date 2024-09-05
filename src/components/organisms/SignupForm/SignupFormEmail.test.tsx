import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { SignupFormEmail } from './SignupFormEmail';

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

describe('SignupFormEmail', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <SignupFormEmail />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should enable the submit button only when the form is valid', async () => {
    render(
      <Provider store={mockStore}>
        <SignupFormEmail />
      </Provider>,
    );

    const emailInput = screen.getByLabelText('Email');
    const continueButton = screen.getByText('Continue');

    expect(continueButton).toBeDisabled();

    fireEvent.change(emailInput, {
      target: { value: 'validemail@example.com' },
    });

    await waitFor(() => {
      expect(continueButton).not.toBeDisabled();
    });
  });
});
