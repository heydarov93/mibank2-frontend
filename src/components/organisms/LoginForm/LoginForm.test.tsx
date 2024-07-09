import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { LoginForm } from './';

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
  };
});

const mockNavigate = jest.fn();
jest.mock('react-router', () => {
  return {
    useNavigate: () => mockNavigate,
  };
});

describe('LoginForm', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={mockStore}>
        <LoginForm />
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('show error email message', async () => {
    render(
      <Provider store={mockStore}>
        <LoginForm />
      </Provider>,
    );
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const button = screen.getByText('Log In');

    waitFor(() => {
      userEvent.type(emailInput, 'BAD_EMAIL');
      userEvent.type(passwordInput, 'qsqs!-65gwvAAA');
    });

    waitFor(() => {
      userEvent.click(button);
    });

    const errorMessage = await screen.findByText(
      'Please enter your email in format: example@gmail.com',
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('show error password message', async () => {
    render(
      <Provider store={mockStore}>
        <LoginForm />
      </Provider>,
    );
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const button = screen.getByText('Log In');

    waitFor(() => {
      userEvent.type(emailInput, 'user@gmail.com');
      userEvent.type(passwordInput, 'BADPASSWORd');
    });

    waitFor(() => {
      userEvent.click(button);
    });

    const errorMessage = await screen.findByText(
      'Format is not correct. Please click ⓘ sign to see requirements',
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
