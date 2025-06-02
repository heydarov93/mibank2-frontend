import { ThemeProvider } from '@mui/material';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ButtonLink } from './ButtonLink';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

describe('ButtonLink', () => {
  it('renders correctly with given props', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ButtonLink
            message="test.message"
            linkText="test.linkText"
            href="https://example.com"
          />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(getByText('test.message')).toBeInTheDocument();
    expect(getByText('test.linkText')).toBeInTheDocument();
  });

  it('has correct href attribute', () => {
    const { getByText } = render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ButtonLink
            message="test.message"
            linkText="test.linkText"
            href="https://example.com"
          />
        </ThemeProvider>
      </MemoryRouter>,
    );

    const link = getByText('test.linkText').closest('a');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ButtonLink
            message="test.message"
            linkText="test.linkText"
            href="https://example.com"
          />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
