import { render, screen } from '@testing-library/react';

import { ErrorPage } from './ErrorPage';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => {
      const translations: Record<string, string> = {
        title: '404 - Page Not Found',
        subTitle:
          'The page you are looking for might have been removed or is temporary unavailable.',
        text: 'Go back to',
        linkText: 'Home',
      };
      return translations[str] || str;
    },
  }),
}));

describe('ErrorPage Component', () => {
  it('snapshot should match', () => {
    const { asFragment } = render(<ErrorPage />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the correct title and subtitle', () => {
    render(<ErrorPage />);

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText(
        'The page you are looking for might have been removed or is temporary unavailable.',
      ),
    ).toBeInTheDocument();
  });

  it('should render the correct text and link', () => {
    render(<ErrorPage />);

    expect(screen.getByText('Go back to')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
