import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';

import { SimpleAlert } from './SimpleAlert';

import '@testing-library/jest-dom';

import { theme } from 'theme/theme';

describe('SimpleAlert', () => {
  it('should render with the correct message', () => {
    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <SimpleAlert open={true} />
      </ThemeProvider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render when open is false', () => {
    render(
      <ThemeProvider theme={theme}>
        <SimpleAlert open={false} />
      </ThemeProvider>,
    );

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
