import { render, screen } from '@testing-library/react';

import { LegalEntityVerificationLayout } from './LegalEntityVerificationLayout';

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

describe('LegalEntityVerificationLayout', () => {
  it('renders all required components', () => {
    render(<LegalEntityVerificationLayout />);

    expect(screen.getByTestId('back-button')).toBeInTheDocument();
    expect(screen.getByTestId('content-wrapper')).toBeInTheDocument();
    expect(
      screen.getByTestId('legal-entity-verification-content'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<LegalEntityVerificationLayout />);
    expect(container).toMatchSnapshot();
  });
});
