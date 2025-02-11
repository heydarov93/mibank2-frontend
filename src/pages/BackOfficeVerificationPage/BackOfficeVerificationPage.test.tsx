import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BackOfficeVerificationPage } from './BackOfficeVerificationPage';
import { useGetAuthenticateEmployeeQuery } from 'api/authenticateEmployeeApi';
import { useLocation } from 'react-router-dom';

jest.mock('api/validateOtpApi', () => ({
  useValidateOtpMutation: () => [jest.fn(), { isLoading: false }],
}));

jest.mock('api/authenticateEmployeeApi', () => ({
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
        <BackOfficeVerificationPage />
      </MemoryRouter>,
    );

    expect(screen.getByAltText('QR Code')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
