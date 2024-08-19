import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render } from '@testing-library/react';

import { Logo, ELogoSize } from './Logo';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const theme = createTheme({
  typography: {
    smallLogo: { fontSize: '12px', lineHeight: '16px', fontFamily: 'Inter' },
    mediumLogo: { fontSize: '16px', lineHeight: '20px', fontFamily: 'Inter' },
  },
});

describe('Logo Component', () => {
  it('should render witthout crashing', () => {
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
    const { getByTestId, getByText } = render(
      <ThemeProvider theme={theme}>
        <Logo size={ELogoSize.MEDIUM} />
      </ThemeProvider>,
    );
    const titleElement = getByText('logoTitle');
    const logoContainer = getByTestId('logo');

    expect(logoContainer).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveStyle(`font-size: 16px`);
    expect(logoContainer).toHaveStyle('flex-direction: column');
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
