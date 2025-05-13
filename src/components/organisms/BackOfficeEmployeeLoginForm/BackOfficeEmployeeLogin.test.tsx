import { ThemeProvider } from '@mui/material';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BackOfficeEmployeeLoginForm } from './BackOfficeEmployeeLoginForm';

import { useValidateEmailMutation } from 'api/employeeController';
import { theme } from 'theme/theme';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('api/employeeController', () => ({
  useValidateEmailMutation: jest.fn(),
}));

describe('BackOfficeEmployeeLoginForm', () => {
  let mockValidateEmail: jest.Mock;
  let fragment: DocumentFragment;

  beforeEach(() => {
    mockValidateEmail = jest
      .fn()
      .mockResolvedValue({ message: 'The email provided is valid' });
    (useValidateEmailMutation as jest.Mock).mockReturnValue([
      mockValidateEmail,
      { isLoading: false },
    ]);
    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <BackOfficeEmployeeLoginForm />
      </ThemeProvider>,
    );

    fragment = asFragment();
  });

  it('should render the form and check the elements', () => {
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Continue');
  });

  it('should show an error message when email is invalid', async () => {
    const emailInput = screen.getByLabelText('Email');

    waitFor(() => {
      userEvent.type(emailInput, 'BAD_EMAIL');
    });

    waitFor(() => {
      fireEvent.blur(emailInput);
    });

    const errorMessage = await screen.findByText(
      `Please enter your email in format: example@gmail.com`,
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('should call the onSubmit function and navigate to verification page when form is valid', async () => {
    const emailInput = screen.getByLabelText('Email');
    waitFor(() => {
      userEvent.type(emailInput, 'validexample@gmail.com');
    });

    waitFor(() => {
      fireEvent.blur(emailInput);
    });
    waitFor(() => {
      const submitButton = screen.getByRole('button');
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should disable the submit button when the form is invalid', async () => {
    const emailInput = screen.getByLabelText('Email');
    waitFor(() => {
      userEvent.type(emailInput, 'BAD_EMAIL');
    });

    waitFor(() => {
      fireEvent.blur(emailInput);
    });

    waitFor(() => {
      const submitButton = screen.getByRole('button');
      expect(submitButton).toBeDisabled();
    });
  });

  it('should match the snapshot', () => {
    expect(fragment).toMatchSnapshot();
  });
});
