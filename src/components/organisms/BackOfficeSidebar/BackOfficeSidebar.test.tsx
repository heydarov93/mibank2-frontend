import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { BackOfficeSidebar } from './BackOfficeSidebar';

import { theme } from 'theme/theme';

jest.mock('assets/icons/PlusIcon.svg', () => ({
  ReactComponent: () => <svg data-testid="PlusIcon" />,
}));
jest.mock('assets/icons/ViewClientsIcon.svg', () => ({
  ReactComponent: () => <svg data-testid="ViewClientsIcon" />,
}));
jest.mock('assets/icons/ViewEmployeesIcon.svg', () => ({
  ReactComponent: () => <svg data-testid="ViewEmployeesIcon" />,
}));
jest.mock('assets/icons/WalletIcon.svg', () => ({
  ReactComponent: () => <svg data-testid="WalletIcon" />,
}));
jest.mock(
  'components/atoms/LogoutButton/LogoutButton',
  () =>
    function LogoutButton() {
      return <button data-testid="LogoutButton">Logout</button>;
    },
);
jest.mock(
  'components/atoms/SettingsButton/SettingsButton',
  () =>
    function SettingsButton() {
      return <button data-testid="SettingsButton">Settings</button>;
    },
);
jest.mock(
  'components/molecules/BackOfficeNavigationLinks/BackOfficeNavigationLink',
  () => ({
    __esModule: true,
    default: ({
      svg: SvgIcon,
      text,
    }: {
      svg: any;
      text: string;
      link: string;
    }) => (
      <div data-testid="BackOfficeNavigationLink">
        <SvgIcon />
        <span>{text}</span>
      </div>
    ),
  }),
);

const renderSidebar = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <BackOfficeSidebar />
      </ThemeProvider>
    </MemoryRouter>,
  );

describe('BackOfficeSidebar', () => {
  it('matches snapshot', () => {
    const { asFragment } = renderSidebar();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders all expected UI elements', () => {
    renderSidebar();

    expect(screen.getAllByTestId('BackOfficeNavigationLink')).toHaveLength(6);
    expect(screen.getAllByTestId('PlusIcon')).toHaveLength(3);

    expect(screen.getByTestId('WalletIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ViewEmployeesIcon')).toBeInTheDocument();
    expect(screen.getByTestId('ViewClientsIcon')).toBeInTheDocument();

    expect(screen.getByTestId('LogoutButton')).toBeInTheDocument();
    expect(screen.getByTestId('SettingsButton')).toBeInTheDocument();
  });
});
