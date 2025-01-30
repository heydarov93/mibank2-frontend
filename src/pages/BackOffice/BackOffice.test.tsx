import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import BackOffice from './BackOffice';

jest.mock('./BackOfficeLeftSidebar', () => ({
  __esModule: true,
  default: () => <div data-testid="BackOfficeLeftSidebar">Sidebar</div>,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div data-testid="Outlet">Outlet</div>,
}));

describe('BackOffice', () => {
  it('renders BackOfficeLeftSidebar and Outlet', () => {
    const { getByTestId } = render(
      <Router>
        <BackOffice />
      </Router>,
    );

    expect(getByTestId('BackOfficeLeftSidebar')).toBeInTheDocument();
    expect(getByTestId('Outlet')).toBeInTheDocument();
  });

  it('has correct layout with flex display', () => {
    const { container } = render(
      <Router>
        <BackOffice />
      </Router>,
    );

    const backOfficeContainer = container.firstChild as HTMLElement;
    expect(backOfficeContainer).toHaveStyle('display: flex');
    expect(backOfficeContainer).toHaveStyle('min-height: 100vh');
    expect(backOfficeContainer).toHaveStyle('width: 100%');
  });
});
