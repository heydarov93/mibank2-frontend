import { ThemeProvider } from '@mui/material';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useLocation, useNavigate } from 'react-router-dom';

import { VerifyEmployeeCodePage } from './VerifyEmployeeCodePage';

import { useAuthenticateEmployeeMutation } from 'api/services/employee-service/employees.api';
import { theme } from 'theme/theme';

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

jest.mock('api/services/employee-service/employees.api', () => ({
  useAuthenticateEmployeeMutation: jest.fn(),
}));

jest.mock('utils/auth/emailFromTokenHandler', () => ({
  getEmailRoleFromToken: jest.fn(() => ({
    email: 'user@mail.com',
    role: 'employee',
  })),
}));

jest.mock('utils/auth/storageAuthHandler', () => ({
  setEmployeeAuthData: jest.fn(),
}));

jest.mock('utils/auth/tokenHandler', () => ({
  sessionTokenHandler: {
    storeToken: jest.fn(),
  },
  localTokenHandler: {
    getToken: jest.fn(),
  },
}));

const renderPage = () => {
  return render(
    <ThemeProvider theme={theme}>
      <VerifyEmployeeCodePage />
    </ThemeProvider>,
  );
};

describe('VerifyEmployeeCodePage', () => {
  const mockNavigate = jest.fn();
  const mockAuthenticate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue({
      state: { email: 'test@example.com' },
    });
    (useAuthenticateEmployeeMutation as jest.Mock).mockReturnValue([
      mockAuthenticate,
      { isLoading: false },
    ]);
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('renders form, text and button correctly', () => {
      renderPage();

      expect(screen.getByText('verifyTitle')).toBeInTheDocument();
      expect(screen.getByText('verifyCodeMessage')).toBeInTheDocument();

      const inputs = screen.getAllByRole('textbox');
      expect(inputs).toHaveLength(6);

      expect(
        screen.getByRole('button', { name: 'confirmButtonText' }),
      ).toBeInTheDocument();
    });

    it('disables submit button if OTP input is incomplete', () => {
      renderPage();
      expect(
        screen.getByRole('button', { name: 'confirmButtonText' }),
      ).toBeDisabled();
    });
  });

  describe('OTP Submission', () => {
    it('submits OTP and navigates on success', async () => {
      const mockUnwrap = jest
        .fn()
        .mockResolvedValue({ accessToken: 'fakeToken' });
      mockAuthenticate.mockReturnValue({ unwrap: mockUnwrap });

      renderPage();

      const inputs = screen.getAllByRole('textbox');
      for (let i = 0; i < inputs.length; i++) {
        await userEvent.type(inputs[i], `${i + 1}`);
      }

      const button = screen.getByRole('button', { name: 'confirmButtonText' });
      await userEvent.click(button);

      await waitFor(() => {
        expect(mockUnwrap).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/back-office/all-employees');
      });
    });

    it('shows error alert when authentication fails', async () => {
      const mockUnwrap = jest.fn().mockRejectedValue(new Error('fail'));
      mockAuthenticate.mockReturnValue({ unwrap: mockUnwrap });

      renderPage();

      const inputs = screen.getAllByRole('textbox');
      for (let i = 0; i < inputs.length; i++) {
        await userEvent.type(inputs[i], `${i + 1}`);
      }

      const button = screen.getByRole('button', { name: 'confirmButtonText' });
      await userEvent.click(button);

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'errors.errorCommon',
      );
    });
  });
});
