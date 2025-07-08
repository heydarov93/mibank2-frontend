import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { LoginForm } from './LoginForm';

import store from 'store';

const mockNavigate = jest.fn();

jest.mock('utils/auth', () => ({
  handleLockedError: jest.fn(),
  useErrorHandlers: jest.fn,
  localTokenHandler: {
    getToken: jest.fn(),
  },
  sessionTokenHandler: {
    getToken: jest.fn(),
  },
}));

jest.mock('utils/helpers/randomHelpers', () => ({
  generateRandomParam: jest.fn().mockReturnValue(''),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('LoginForm', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('snapshot should match', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('show error email message', async () => {
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

  it('should navigate to forgot password page', async () => {
    const forgotPasswordLink = screen.getByText('Forgot password?');
    expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password');
  });
});
