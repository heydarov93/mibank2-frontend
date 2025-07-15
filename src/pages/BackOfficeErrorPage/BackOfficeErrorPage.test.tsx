import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { BackOfficeErrorPage } from './BackOfficeErrorPage';

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
        <BackOfficeErrorPage />
      </ThemeProvider>
    </BrowserRouter>,
  );
};

describe('BackOfficeErrorPage', () => {
  it('renders the page components correctly', () => {
    renderPage();

    expect(screen.getByTestId('logo')).toBeInTheDocument();
    expect(screen.getByTestId('reload-button')).toBeInTheDocument();
    expect(screen.getByText('serviceUnavailable')).toBeInTheDocument();
    expect(screen.getByText('refresh')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = renderPage();
    expect(container).toMatchSnapshot();
  });
});
