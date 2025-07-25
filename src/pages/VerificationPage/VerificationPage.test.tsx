import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { VerificationPage } from './VerificationPage';

import { useAppSelector } from 'hooks';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

jest.mock('hooks', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('store/slices/auth', () => ({
  getIsVerifying: jest.fn(),
}));

jest.mock('components/atoms', () => ({
  BackButton: () => <div data-testid="back-button">Back</div>,
}));

jest.mock('components/organisms', () => ({
  UserAuthWrapper: ({ children }: { children: ReactNode }) => (
    <div data-testid="auth-wrapper">{children}</div>
  ),
  OtpVerificationForm: ({ disableFields }: { disableFields: boolean }) => (
    <div data-testid="verification-form">
      {disableFields ? 'disabled' : 'enabled'}
    </div>
  ),
  Footer: () => <div data-testid="footer">Footer</div>,
}));

describe('VerificationPage', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  describe('when user is not verifying', () => {
    it('navigates back and renders nothing', () => {
      (useAppSelector as jest.Mock).mockReturnValue(false);
      (useLocation as jest.Mock).mockReturnValue({ state: {} });

      const { container } = render(<VerificationPage />);
      expect(mockNavigate).toHaveBeenCalledWith(-1);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('when user is verifying', () => {
    beforeEach(() => {
      (useAppSelector as jest.Mock).mockReturnValue(true);
    });

    it('renders all components correctly with enabled fields', () => {
      (useLocation as jest.Mock).mockReturnValue({ state: {} });

      render(<VerificationPage />);
      expect(screen.getByTestId('back-button')).toBeInTheDocument();
      expect(screen.getByTestId('auth-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('verification-form')).toHaveTextContent(
        'enabled',
      );
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('passes disableFields=true when location.state.isError=true', () => {
      (useLocation as jest.Mock).mockReturnValue({ state: { isError: true } });

      render(<VerificationPage />);
      expect(screen.getByTestId('verification-form')).toHaveTextContent(
        'disabled',
      );
    });
  });
});
