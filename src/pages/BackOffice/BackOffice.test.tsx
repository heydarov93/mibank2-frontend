import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { BackOffice } from './BackOffice';


jest.mock('./BackOfficeLeftSidebar', () => ({
  __esModule: true,
  default: () => <div data-testid="BackOfficeLeftSidebar">Sidebar</div>,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="Outlet">Outlet</div>,
}));

describe('BackOffice', () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <BackOffice />
      </MemoryRouter>,
    );

  it('renders BackOfficeLeftSidebar and Outlet', () => {
    setup();

    expect(screen.getByTestId('BackOfficeLeftSidebar')).toBeInTheDocument();
    expect(screen.getByTestId('Outlet')).toBeInTheDocument();
  });

  it('has correct layout with flex display', () => {
    const { container } = setup();

    const backOfficeContainer = container.firstChild as HTMLElement;
    expect(backOfficeContainer).toHaveStyle({
      display: 'flex',
      minHeight: '100vh',
      width: '100%',
    });
  });
});
