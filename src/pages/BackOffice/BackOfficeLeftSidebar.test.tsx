import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BackOfficeLeftSidebar from './BackOfficeLeftSidebar';

jest.mock('../../assets/icons/PlusIcon.svg', () => ({
  ReactComponent: () => <svg data-testid="PlusIcon" />,
}));
jest.mock('../../assets/icons/ViewClientsIcon.svg', () => ({
  ReactComponent: () => <svg data-testid="ViewClientsIcon" />,
}));
jest.mock('../../assets/icons/ViewEmployeesIcon.svg', () => ({
  ReactComponent: () => <svg data-testid="ViewEmployeesIcon" />,
}));
jest.mock('../../assets/icons/WalletIcon.svg', () => ({
  ReactComponent: () => <svg data-testid="WalletIcon" />,
}));
jest.mock('components/atoms/Logo/Logo.styled', () => ({
  StyledIcon: () => <div data-testid="StyledIcon" />,
  StyledLogo: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="StyledLogo">{children}</div>
  ),
}));
jest.mock('components/atoms/LogoutButton/LogoutButton', () => () => (
  <button data-testid="LogoutButton">Logout</button>
));
jest.mock('components/atoms/SettingsButton/SettingsButton', () => () => (
  <button data-testid="SettingsButton">Settings</button>
));
jest.mock(
  'components/molecules/BackOfficeNavigationLinks/BackOfficeNavigationLink',
  () => ({
    __esModule: true,
    default: ({
      svg: SvgIcon,
      text,
      link,
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

describe('BackOfficeLeftSidebar', () => {
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(
      <Router>
        <BackOfficeLeftSidebar />
      </Router>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders all expected components', () => {
    const { getByTestId, getAllByTestId, getByText } = render(
      <Router>
        <BackOfficeLeftSidebar />
      </Router>,
    );

    expect(getByText('Millennium Bank')).toBeInTheDocument();
    expect(getByTestId('StyledLogo')).toBeInTheDocument();

    const navLinks = getAllByTestId('BackOfficeNavigationLink');
    expect(navLinks.length).toBe(6);

    expect(getAllByTestId('PlusIcon').length).toBe(3);
    expect(getByTestId('WalletIcon')).toBeInTheDocument();
    expect(getByTestId('ViewEmployeesIcon')).toBeInTheDocument();
    expect(getByTestId('ViewClientsIcon')).toBeInTheDocument();

    expect(getByTestId('LogoutButton')).toBeInTheDocument();
    expect(getByTestId('SettingsButton')).toBeInTheDocument();
  });
});
