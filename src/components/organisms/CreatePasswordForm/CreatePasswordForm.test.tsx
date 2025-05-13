import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { CreatePasswordForm } from './CreatePasswordForm';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('utils', () => {
  return {
    generateRandomParam: jest.fn().mockReturnValue(''),
  };
});

describe('CreatePasswordForm', () => {
  beforeEach(() => {
    render(<CreatePasswordForm />);
  });

  it('snapshot should match', () => {
    const { asFragment } = render(<CreatePasswordForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should enable the submit button only when the form is valid', async () => {
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
