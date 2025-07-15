import { render, screen } from '@testing-library/react';

import { LegalEntityVerificationPage } from './LegalEntityVerificationPage';

jest.mock('components/atoms', () => ({
  BackButton: () => <button data-testid="back-button">Back</button>,
}));

jest.mock('components/organisms', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
  LegalEntityVerificationContent: () => (
    <div data-testid="legal-entity-verification-content">
      Legal Entity Verification Content
    </div>
  ),
}));

describe('LegalEntityVerificationPage', () => {
  it('renders all required components', () => {
    render(<LegalEntityVerificationPage />);

    expect(screen.getByTestId('back-button')).toBeInTheDocument();
    expect(screen.getByTestId('content-wrapper')).toBeInTheDocument();
    expect(
      screen.getByTestId('legal-entity-verification-content'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<LegalEntityVerificationPage />);
    expect(container).toMatchSnapshot();
  });
});
