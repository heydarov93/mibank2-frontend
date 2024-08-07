import { render } from '@testing-library/react';

import { ButtonLink } from './ButtonLink';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str, // Identity function for simplicity in tests
  }),
}));

describe('ButtonLink', () => {
  it('renders correctly with given props', () => {
    const { getByText } = render(
      <ButtonLink
        message="test.message"
        linkText="test.linkText"
        href="https://example.com"
      />,
    );

    expect(getByText('test.message')).toBeInTheDocument();
    expect(getByText('test.linkText')).toBeInTheDocument();
  });

  it('has correct href attribute', () => {
    const { getByText } = render(
      <ButtonLink
        message="test.message"
        linkText="test.linkText"
        href="https://example.com"
      />,
    );

    const link = getByText('test.linkText').closest('a');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
