import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';

import { BackOfficeVerificationPage } from './BackOfficeVerificationPage';

import { useGetAuthenticateEmployeeQuery } from 'api/services/employee-service/employees.api';
import { theme } from 'theme/theme';


jest.mock('api/services/employee-service/employees.api', () => ({
  useValidateOTPMutation: () => [jest.fn(), { isLoading: false }],
  useGetAuthenticateEmployeeQuery: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
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

describe('BackOfficeVerificationPage visual snapshots', () => {
  beforeEach(() => {
    (useLocation as jest.Mock).mockReturnValue({
      search: '?token=test-token',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loaded data state snapshot', () => {
    (useGetAuthenticateEmployeeQuery as jest.Mock).mockReturnValue({
      data: {
        email: 'test@example.com',
        qrCodeBaseUrl: 'mock-base64-string',
      },
      isLoading: false,
      error: null,
    });

    const { container } = render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <BackOfficeVerificationPage />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByAltText('QR Code')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
