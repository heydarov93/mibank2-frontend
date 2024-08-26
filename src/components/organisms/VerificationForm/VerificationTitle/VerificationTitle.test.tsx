import { render } from '@testing-library/react';

import { VerificationTitle } from './VerificationTitle';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

describe('VerificationTitle Component', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(
      <VerificationTitle email="test@example.com" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    render(<VerificationTitle email="test@example.com" />);
  });

  it('renders the title with correct text', () => {
    const { getByText } = render(
      <VerificationTitle email="test@example.com" />,
    );
    expect(getByText('verificationTitle')).toBeInTheDocument();
  });

  it('renders the subtitle with correct text and email', () => {
    const { getByText } = render(
      <VerificationTitle email="test@example.com" />,
    );
    expect(getByText('verificationText')).toBeInTheDocument();
    expect(getByText('test@example.com')).toBeInTheDocument();
  });
});
