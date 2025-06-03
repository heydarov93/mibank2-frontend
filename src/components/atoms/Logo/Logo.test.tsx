import { ThemeProvider } from '@mui/material/styles';
import { render } from '@testing-library/react';

import { Logo } from './Logo';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

describe('Logo Component', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Logo />
      </ThemeProvider>,
    );
    const logoContainer = getByTestId('logo');
    expect(logoContainer).toBeInTheDocument();
  });

  it('should render with small title by default', () => {
    const { getByText, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Logo />
      </ThemeProvider>,
    );

    const titleElement = getByText('logoTitle');
    const logoContainer = getByTestId('logo');

    expect(logoContainer).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveStyle(`font-size: 12px`);
    expect(logoContainer).toHaveStyle('flex-direction: row');
  });

  it('should render with medium title when specified', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Logo size="md" />
      </ThemeProvider>,
    );
    const titleElement = getByText('logoTitle');

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveStyle(`font-size: 16px`);
  });

  it('should render BankLogoBoxIcon', () => {
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Logo />
      </ThemeProvider>,
    );

    const svgIcon = container.querySelector('svg');
    expect(svgIcon).toBeInTheDocument();
  });
});
