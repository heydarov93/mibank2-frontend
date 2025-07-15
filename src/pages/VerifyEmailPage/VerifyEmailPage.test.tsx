import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { VerifyEmailPage } from './VerifyEmailPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('components/organisms', () => ({
  AuthPageWrapper: ({ children }: { children: ReactNode }) => (
    <div data-testid="auth-wrapper">{children}</div>
  ),
}));

describe('VerifyEmailPage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  describe('when email is not provided in location state', () => {
    it('redirects to welcome page and renders nothing', () => {
      (useLocation as jest.Mock).mockReturnValue({ state: {} });

      const { container } = render(<VerifyEmailPage />);
      expect(mockNavigate).toHaveBeenCalledWith('/welcome');
      expect(container.firstChild).toBeNull();
    });
  });

  describe('when email is provided in location state', () => {
    const email = 'user@example.com';

    beforeEach(() => {
      (useLocation as jest.Mock).mockReturnValue({
        state: { email },
      });
    });

    it('renders wrapper and displays email', () => {
      render(<VerifyEmailPage />);

      expect(screen.getByTestId('auth-wrapper')).toBeInTheDocument();
      expect(screen.getByText(/title/i)).toBeInTheDocument();
      expect(screen.getByText(email)).toBeInTheDocument();
      expect(screen.getByText(/notReceived/i)).toBeInTheDocument();
      expect(screen.getByText(/resend/i)).toBeInTheDocument();
    });
  });
});
