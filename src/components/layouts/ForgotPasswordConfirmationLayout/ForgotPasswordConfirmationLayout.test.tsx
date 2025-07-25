import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import { ForgotPasswordConfirmationLayout } from './ForgotPasswordConfirmationLayout';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

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
  LinkButton: ({
    message,
    linkText,
  }: {
    message: string;
    linkText: string;
  }) => (
    <div data-testid="link-container">
      <p>{message}</p>
      <a role="button" href="/signin" data-testid="link-button">
        {linkText}
      </a>
    </div>
  ),
}));

jest.mock('components/organisms', () => ({
  UserAuthWrapper: ({ children }: { children: ReactNode }) => (
    <div data-testid="auth-wrapper">{children}</div>
  ),
  Footer: () => <div data-testid="footer">Footer</div>,
}));

describe('ForgotPasswordConfirmationLayout', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  describe('initial render', () => {
    it('renders all page components correctly', () => {
      render(<ForgotPasswordConfirmationLayout />);

      expect(screen.getByTestId('back-arrow')).toBeInTheDocument();
      expect(screen.getByTestId('auth-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('link-container')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
  });

  describe('navigation behavior', () => {
    it('navigates to sign-in when back arrow is clicked', async () => {
      render(<ForgotPasswordConfirmationLayout />);
      await userEvent.click(screen.getByTestId('back-arrow'));
      expect(mockNavigate).toHaveBeenCalledWith('/signin');
    });

    it('navigates to sign-in when link button is clicked', async () => {
      render(<ForgotPasswordConfirmationLayout />);
      await userEvent.click(screen.getByTestId('link-button'));
      expect(screen.getByTestId('link-button')).toHaveAttribute(
        'href',
        '/signin',
      );
    });
  });
});
