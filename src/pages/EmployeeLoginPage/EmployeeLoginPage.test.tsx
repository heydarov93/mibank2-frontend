import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { EmployeeLoginPage } from './EmployeeLoginPage';

import { localTokenHandler } from 'utils/auth';

jest.mock('components/organisms', () => ({
  AuthWrapper: ({ children }: { children: ReactNode }) => (
    <div data-testid="auth-wrapper">{children}</div>
  ),
  BackOfficeEmployeeLoginForm: () => (
    <form data-testid="employee-login-form">Employee Login Form</form>
  ),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('utils/auth', () => ({
  localTokenHandler: {
    getToken: jest.fn(),
  },
}));

describe('EmployeeLoginPage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  describe('when no access token exists', () => {
    beforeEach(() => {
      (localTokenHandler.getToken as jest.Mock).mockReturnValue('');
    });

    it('renders AuthWrapper and BackOfficeEmployeeLoginForm', () => {
      render(<EmployeeLoginPage />);

      expect(screen.getByTestId('auth-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('employee-login-form')).toBeInTheDocument();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('when access token exists', () => {
    beforeEach(() => {
      (localTokenHandler.getToken as jest.Mock).mockReturnValue('mocked-token');
    });

    it('redirects to home and renders nothing', () => {
      const { container } = render(<EmployeeLoginPage />);

      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(container.firstChild).toBeNull();
    });
  });
});
