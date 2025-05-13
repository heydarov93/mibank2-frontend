import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import { LegalEntityVerificationContent } from './LegalEntityVerificationContent';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, vars?: Record<string, string>) => {
      const translations: Record<string, string> = {
        'legalEntityVerification.title': 'Verify your email',
        'legalEntityVerification.body': `We’ve sent an email to ${vars?.email}.`,
        'legalEntityVerification.isReceiveEmail': 'Didn’t receive email?',
        'legalEntityVerification.sendLink': 'Send another link',
        'legalEntityVerification.isAlreadyConfirmed':
          'Already confirmed an account?',
        'legalEntityVerification.loginLink': 'Log in',
      };
      return translations[key] ?? key;
    },
  }),
}));

jest.mock('components/atoms', () => ({
  ELogoSize: { MEDIUM: 'medium' },
  Logo: ({ size }: { size: string }) => (
    <div data-testid="logo" data-size={size} />
  ),
}));

describe('LegalEntityVerificationContent', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <LegalEntityVerificationContent />
      </MemoryRouter>,
    );
    jest.clearAllMocks();
  });

  it('renders the company logo at medium size', () => {
    const logo = screen.getByTestId('logo');
    expect(logo).toHaveAttribute('data-size', 'medium');
  });

  it('renders the title and body text', () => {
    expect(screen.getByText('Verify your email')).toBeInTheDocument();
    expect(
      screen.getByText('We’ve sent an email to user@gmail.com.'),
    ).toBeInTheDocument();
  });

  it('renders two links with the correct hrefs', () => {
    const links = screen.getAllByTestId('router-link');
    expect(links).toHaveLength(2);
    links.forEach(link => expect(link).toHaveAttribute('href', '/'));
  });

  it('allows clicking the resend link without error', async () => {
    const resendLink = screen.getByRole('link', { name: /send another link/i });
    await userEvent.click(resendLink);

    expect(resendLink).toBeEnabled();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <LegalEntityVerificationContent />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
