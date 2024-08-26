import { configureStore } from '@reduxjs/toolkit';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('shows an error message if the format is wrong', async () => {
    render(
      <Provider store={mockStore}>
        <SignupFormPassword />
      </Provider>,
    );
    const passwordInput = screen.getByLabelText('Password');
    const signupButton = screen.getByText('Sign Up');

    waitFor(() => {
      userEvent.type(passwordInput, 'BADPASSWORd');
    });

    waitFor(() => {
      userEvent.click(signupButton);
    });

    const errorMessage = await screen.findByText(
      'Format is not correct. Please click ⓘ sign to see requirements',
    );

    expect(errorMessage).toBeInTheDocument();
  });
});
