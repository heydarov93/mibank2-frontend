import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordLayout } from './ForgotPasswordLayout';

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
  UserAuthWrapper: ({ children }: { children: ReactNode }) => (
    <div data-testid="auth-wrapper">{children}</div>
  ),
  Footer: () => <div data-testid="footer">Footer</div>,
  ForgotPassword: () => (
    <div data-testid="forgot-password-form">Forgot Form</div>
  ),
}));

describe('ForgotPasswordLayout', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  describe('initial render', () => {
    it('renders BackArrow, ForgotPassword form, Footer, and AuthWrapper', () => {
      render(<ForgotPasswordLayout />);

      expect(screen.getByTestId('auth-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('back-arrow')).toBeInTheDocument();
      expect(screen.getByTestId('forgot-password-form')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  describe('navigation behavior', () => {
    it('navigates to sign-in when BackArrow is clicked', async () => {
      render(<ForgotPasswordLayout />);
      await userEvent.click(screen.getByTestId('back-arrow'));
      expect(mockNavigate).toHaveBeenCalledWith('/signin');
    });
  });
});
