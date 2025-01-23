import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BackOfficeEmployeeLoginForm } from './BackOfficeEmployeeLoginForm';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('BackOfficeEmployeeLoginForm', () => {
  it('should render the form and check the elements', () => {
    render(<BackOfficeEmployeeLoginForm />);
    expect(screen.getByText('Log in')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Continue');
  });

  it('should show an error message when email is invalid', async () => {
    render(<BackOfficeEmployeeLoginForm />);
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
    render(<BackOfficeEmployeeLoginForm />);
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
    render(<BackOfficeEmployeeLoginForm />);
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
    const { asFragment } = render(<BackOfficeEmployeeLoginForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
