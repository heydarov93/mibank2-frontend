import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('shows an error message if the format is wrong', async () => {
    render(
      <Provider store={mockStore}>
        <SignupFormEmail />
      </Provider>,
    );

    const emailInput = screen.getByLabelText('Email');
    const continueButton = screen.getByText('Continue');

    waitFor(() => {
      userEvent.type(emailInput, 'BAD_EMAIL');
    });

    waitFor(() => {
      userEvent.click(continueButton);
    });

    const errorMessage = await screen.findByText(
      'Please enter your email in format: example@gmail.com',
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
