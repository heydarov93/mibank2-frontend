import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { useSearchParams } from 'react-router-dom';

import { BackOfficeVerificationLayout } from './BackOfficeVerificationLayout';

import { useGetAuthenticateEmployeeQuery } from 'api/services/employee-service/employees.api';
import { theme } from 'theme/theme';

interface BackOfficeVerificationStepProps {
  children: JSX.Element;
  stepLabel: string;
  headerLabel: string;
  descriptionLabel: string;
  loading: boolean;
}

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
  useSearchParams: jest.fn(),
}));

jest.mock('api/services/employee-service/employees.api', () => ({
  useGetAuthenticateEmployeeQuery: jest.fn(),
}));

const renderPage = () => {
  return render(
    <ThemeProvider theme={theme}>
      <BackOfficeVerificationLayout />
    </ThemeProvider>,
  );
};

jest.mock('components/organisms', () => ({
  BackOfficeVerificationStep: ({
    children,
    stepLabel,
    headerLabel,
    descriptionLabel,
    loading,
  }: BackOfficeVerificationStepProps) => (
    <div>
      <div data-testid="step-label">{stepLabel}</div>
      <div data-testid="header-label">{headerLabel}</div>
      <div data-testid="desc-label">{descriptionLabel}</div>
      {!loading && children}
    </div>
  ),
  OneTimePasscodeForm: ({ email }: { email: string }) =>
    email ? <div data-testid="otp-form">{email}</div> : null,
}));

jest.mock(
  'pages/BackOfficeVerificationErrorPage/BackOfficeVerificationErrorPage',
  () => ({
    BackOfficeVerificationErrorPage: () => (
      <div data-testid="error-page">Error Page</div>
    ),
  }),
);

describe('BackOfficeVerificationLayout', () => {
  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams({ token: 'dummy-token' }),
    ]);
  });

  describe('When API call is successful', () => {
    beforeEach(() => {
      (useGetAuthenticateEmployeeQuery as jest.Mock).mockReturnValue({
        data: {
          email: 'user@example.com',
          qrCodeBaseUrl: 'base64EncodedQrCode',
        },
        isLoading: false,
        error: null,
      });
    });

    it('renders both verification steps and OTP form', () => {
      renderPage();

      expect(screen.getByTestId('main-container')).toBeInTheDocument();
      expect(screen.getByTestId('otp-form')).toHaveTextContent(
        'user@example.com',
      );
      expect(screen.getByRole('img', { name: /QR Code/i })).toHaveAttribute(
        'src',
        expect.stringContaining('base64EncodedQrCode'),
      );
    });
  });

  describe('While loading or fetching data', () => {
    it('renders loading state when data is not ready', () => {
      (useGetAuthenticateEmployeeQuery as jest.Mock).mockReturnValue({
        data: null,
        isLoading: true,
        error: null,
      });

      renderPage();
      expect(screen.queryByTestId('otp-form')).not.toBeInTheDocument();
      expect(
        screen.queryByRole('img', { name: /QR Code/i }),
      ).not.toBeInTheDocument();
    });
  });

  describe('When API returns an error', () => {
    it('renders error page', () => {
      (useGetAuthenticateEmployeeQuery as jest.Mock).mockReturnValue({
        error: true,
        isLoading: false,
        data: null,
      });

      renderPage();
      expect(screen.getByTestId('error-page')).toBeInTheDocument();
    });
  });
});
