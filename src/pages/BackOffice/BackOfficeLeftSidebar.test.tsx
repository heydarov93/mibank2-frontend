import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import BackOfficeLeftSidebar from './BackOfficeLeftSidebar';

const mockLocation = (pathname: string) => ({
  pathname,
  state: null,
  search: '',
  hash: '',
  key: 'test-key',
});

describe('BackOfficeLeftSidebar', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <BackOfficeLeftSidebar
          location={mockLocation('/back-office/create-employee')}
        />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the Millennium Bank title and logo', () => {
    render(
      <MemoryRouter>
        <BackOfficeLeftSidebar
          location={mockLocation('/back-office/create-employee')}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Millennium Bank')).toBeInTheDocument();
    expect(screen.getByText('Logo.svg')).toBeInTheDocument();
  });

  test('highlights the Employees text and link when active', () => {
    render(
      <MemoryRouter>
        <BackOfficeLeftSidebar
          location={mockLocation('/back-office/create-employee')}
        />
      </MemoryRouter>,
    );

    const employeesText = screen.getByText('Employees');
    expect(employeesText).toHaveStyle('color: white');

    const link = screen.getByText('Add a new employee');
    expect(link).toHaveStyle('color: white');
  });

  test('renders inactive Employees text and link when not active', () => {
    render(
      <MemoryRouter>
        <BackOfficeLeftSidebar location={mockLocation('/some-other-path')} />
      </MemoryRouter>,
    );

    const employeesText = screen.getByText('Employees');
    expect(employeesText).toHaveStyle('color: #A8ADBA');

    const link = screen.getByText('Add a new employee');
    expect(link).toHaveStyle('color: #A8ADBA');
  });

  test('renders the link with the correct href', () => {
    render(
      <MemoryRouter>
        <BackOfficeLeftSidebar location={mockLocation('/')} />
      </MemoryRouter>,
    );

    const link = screen.getByText('Add a new employee');
    expect(link.closest('a')).toHaveAttribute(
      'href',
      '/back-office/create-employee',
    );
  });
});
