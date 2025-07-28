import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { ErrorPage } from './ErrorPage';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const renderPage = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ErrorPage />
      </ThemeProvider>
    </BrowserRouter>,
  );
};

describe('ErrorPage', () => {
  it('renders the page components correctly', () => {
    renderPage();

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('subTitle')).toBeInTheDocument();
    expect(screen.getByText('text')).toBeInTheDocument();
  });

  it('renders link and link to home', () => {
    renderPage();

    const link = screen.getByRole('link', { name: 'linkText' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('matches snapshot', () => {
    const { container } = renderPage();
    expect(container).toMatchSnapshot();
  });
});
