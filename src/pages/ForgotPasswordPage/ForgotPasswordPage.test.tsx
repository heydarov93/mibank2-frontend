import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordPage } from './ForgotPasswordPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('components/atoms', () => ({
  BackArrow: ({ onBackClick }: { onBackClick: () => void }) => (
    <button onClick={onBackClick} data-testid="back-arrow">
      Back
    </button>
  ),
}));

jest.mock('components/organisms', () => ({
  AuthWrapper: ({ children }: { children: ReactNode }) => (
    <div data-testid="auth-wrapper">{children}</div>
  ),
  Footer: () => <div data-testid="footer">Footer</div>,
  ForgotPassword: () => (
    <div data-testid="forgot-password-form">Forgot Form</div>
  ),
}));

describe('ForgotPasswordPage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  describe('initial render', () => {
    it('renders BackArrow, ForgotPassword form, Footer, and AuthWrapper', () => {
      render(<ForgotPasswordPage />);

      expect(screen.getByTestId('auth-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('back-arrow')).toBeInTheDocument();
      expect(screen.getByTestId('forgot-password-form')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  describe('navigation behavior', () => {
    it('navigates to sign-in when BackArrow is clicked', async () => {
      render(<ForgotPasswordPage />);
      await userEvent.click(screen.getByTestId('back-arrow'));
      expect(mockNavigate).toHaveBeenCalledWith('/signin');
    });
  });
});
