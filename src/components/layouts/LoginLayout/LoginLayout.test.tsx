import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginLayout } from './LoginLayout';

import { localTokenHandler } from 'utils/auth';

jest.mock('components/organisms', () => ({
  UserAuthWrapper: ({ children }: { children: ReactNode }) => (
    <div data-testid="auth-wrapper">{children}</div>
  ),
  LoginForm: () => <form data-testid="login-form">Login Form</form>,
  Footer: () => <div data-testid="footer">Footer</div>,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('utils/auth', () => ({
  getEmail: jest.fn(() => 'test@example.com'),
  localTokenHandler: {
    getToken: jest.fn(),
  },
}));

describe('LoginLayout', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  describe('when no access token exists', () => {
    beforeEach(() => {
      (localTokenHandler.getToken as jest.Mock).mockReturnValue('');
    });

    it('renders AuthWrapper and LoginForm', () => {
      render(<LoginLayout />);

      expect(screen.getByTestId('auth-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('login-form')).toBeInTheDocument();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  describe('when access token exists', () => {
    beforeEach(() => {
      (localTokenHandler.getToken as jest.Mock).mockReturnValue('mocked-token');
    });

    it('redirects to home and renders nothing', () => {
      const { container } = render(<LoginLayout />);

      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(container.firstChild).toBeNull();
    });
  });
});
