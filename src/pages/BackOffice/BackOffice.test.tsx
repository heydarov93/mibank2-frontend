import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import BackOffice from './BackOffice';

describe('BackOffice Component', () => {
  const renderComponent = (route = '/back-office/create-employee') =>
    render(
      <MemoryRouter initialEntries={[route]}>
        <BackOffice />
      </MemoryRouter>,
    );

  it('should render the BackOfficeComponent', () => {
    renderComponent();
  });

  it('should render the BackOfficeComponent with the LeftSidebar and CreateEmployee component', () => {
    renderComponent('/back-office/create-employee');
    expect(screen.getByText('Millennium Bank')).toBeInTheDocument();
    expect(screen.getByText('Logo.svg')).toBeInTheDocument();
    expect(screen.getByText('Employees')).toBeInTheDocument();
    expect(screen.getByText('Employees')).toBeInTheDocument();
    expect(screen.getByText('Add a new employee')).toBeInTheDocument();
    expect(screen.getByText('Add new employee')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByText('Date Added')).toBeInTheDocument();
  });
});
