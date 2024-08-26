import { render, screen } from '@testing-library/react';

import { termsLink, policyLink } from '../constants';

import { FooterTerms } from './FooterTerms';

import { generateRandomParam } from 'utils';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

jest.mock('utils', () => ({
  generateRandomParam: jest.fn().mockReturnValue('randomParam'),
}));

describe('FooterTerms', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the terms and policy links with correct href attributes', () => {
    (generateRandomParam as jest.Mock).mockReturnValue('randomParam');
    render(<FooterTerms />);

    const termsLinkElement = screen.getByText('footerBottom.terms');
    const policyLinkElement = screen.getByText('footerBottom.policy');
    const copyrightElement = screen.getByText('footerBottom.copyright');

    expect(termsLinkElement).toBeInTheDocument();
    expect(policyLinkElement).toBeInTheDocument();
    expect(copyrightElement).toBeInTheDocument();

    expect(termsLinkElement).toHaveAttribute('href', `${termsLink}randomParam`);
    expect(policyLinkElement).toHaveAttribute(
      'href',
      `${policyLink}randomParam`,
    );
  });

  it('calls generateRandomParam to generate URLs', () => {
    render(<FooterTerms />);

    expect(generateRandomParam).toHaveBeenCalled();
  });

  it('displays correct content in each element', () => {
    render(<FooterTerms />);

    expect(screen.getByText('footerBottom.terms')).toBeInTheDocument();
    expect(screen.getByText('footerBottom.and')).toBeInTheDocument();
    expect(screen.getByText('footerBottom.policy')).toBeInTheDocument();
    expect(screen.getByText('footerBottom.copyright')).toBeInTheDocument();
  });
});
