import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { BackOfficeVerificationErrorPage } from './BackOfficeVerificationErrorPage';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('components/atoms', () => ({
  ReloadButton: ({ onClick }: { onClick: () => void }) => (
    <button data-testid="reload-button" onClick={onClick}>
      Reload Button
    </button>
  ),
}));

const renderPage = () => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <BackOfficeVerificationErrorPage />
      </ThemeProvider>
    </BrowserRouter>,
  );
};

describe('BackOfficeVerificationErrorPage', () => {
  it('renders the page components correctly', () => {
    renderPage();

    expect(screen.getByText('QRCodeExpired')).toBeInTheDocument();
    expect(screen.getByText('RefreshPage')).toBeInTheDocument();
    expect(screen.getByTestId('reload-button')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = renderPage();
    expect(container).toMatchSnapshot();
  });
});
