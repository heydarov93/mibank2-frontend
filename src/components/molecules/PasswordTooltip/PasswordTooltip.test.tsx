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

  it('renders ErrorOutline icon', () => {
    renderComponent();
    const errorIcon = screen.getByTestId('ErrorOutlineIcon');
    expect(errorIcon).toBeInTheDocument();
  });

  it('opens tooltip on icon click', () => {
    renderComponent();
    const errorIcon = screen.getByTestId('ErrorOutlineIcon');
    fireEvent.click(errorIcon);

    const tooltipContent = screen.getByText('infoHintTitle');
    expect(tooltipContent).toBeInTheDocument();
  });

  it('displays correct content in the tooltip', () => {
    renderComponent();
    const errorIcon = screen.getByTestId('ErrorOutlineIcon');
    fireEvent.click(errorIcon);

    expect(screen.getByText('infoHintTitle')).toBeInTheDocument();
    expect(screen.getByText('infoHintUpper')).toBeInTheDocument();
    expect(screen.getByText('infoHintLower')).toBeInTheDocument();
    expect(screen.getByText('infoHintDigit')).toBeInTheDocument();
    expect(screen.getByText('infoHintSpecial')).toBeInTheDocument();
  });

  it('does not open the tooltip on hover', () => {
    renderComponent();
    const errorIcon = screen.getByTestId('ErrorOutlineIcon');
    fireEvent.mouseOver(errorIcon);

    const tooltipContent = screen.queryByText('infoHintTitle');
    expect(tooltipContent).not.toBeInTheDocument();
  });
});
