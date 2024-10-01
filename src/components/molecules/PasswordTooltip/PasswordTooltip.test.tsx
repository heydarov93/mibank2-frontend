import { ThemeProvider, createTheme } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';

import { PasswordTooltip } from './PasswordTooltip';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

describe('PasswordTooltip Component', () => {
  const renderComponent = () =>
    render(
      <ThemeProvider theme={createTheme()}>
        <PasswordTooltip />
      </ThemeProvider>,
    );

  it('renders InfoOutlinedIcon icon', () => {
    renderComponent();
    const errorIcon = screen.getByTestId('InfoOutlinedIcon');
    expect(errorIcon).toBeInTheDocument();
  });

  it('opens tooltip on icon hover', () => {
    renderComponent();
    const errorIcon = screen.getByTestId('InfoOutlinedIcon');
    fireEvent.mouseOver(errorIcon);

    const tooltipContent = screen.getByText('infoHintSpecial');
    expect(tooltipContent).toBeInTheDocument();
  });

  it('displays correct content in the tooltip', () => {
    renderComponent();
    const errorIcon = screen.getByTestId('InfoOutlinedIcon');
    fireEvent.mouseOver(errorIcon);

    expect(screen.getByText('infoHintSpecial')).toBeInTheDocument();
    expect(screen.getByText('infoHintSpecialCharacters')).toBeInTheDocument();
  });

  it('opens the tooltip on hover', () => {
    renderComponent();
    const errorIcon = screen.getByTestId('InfoOutlinedIcon');
    fireEvent.mouseOver(errorIcon);

    const tooltipContent = screen.queryByText('infoHintSpecial');
    expect(tooltipContent).toBeInTheDocument();
  });
});
