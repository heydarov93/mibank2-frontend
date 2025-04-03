import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import BackOfficeViewEmployees from './BackOfficeViewEmployees';

import useEmployees from 'hooks/useEmployee';

jest.mock('hooks/useEmployee');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'header.employeesList': 'Employees List',
        'header.employeesInfo': 'Employee Information',
        'header.addEmployee': 'Add Employee',
        'employeeList.firstName': 'First Name',
        'employeeList.lastName': 'Last Name',
        'employeeList.role': 'Role',
        'employeeList.email': 'Email',
        'employeeList.addedDate': 'Date Added',
        'LastResortDeposit.edit': 'Edit',
        'LastResortDeposit.delete': 'Delete',
        'warningWindow.deleteEmployee': 'Delete Employee',
        'warningWindow.deleteEmployeeText':
          'Deletion is irreversible. Are you sure you want to delete {{firstName}} {{lastName}}?',
        'ConfirmationWindow.cancelBtn': 'Cancel',
      };
      return translations[key] || key;
    },
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const mockEmployeesData = {
  tableData: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      role: 'Admin',
      email: 'john.doe@example.com',
      dateAdded: '2024-04-01',
    },
  ],
  tableHead: [
    { label: 'First Name', key: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Role', key: 'role' },
    { label: 'Email', key: 'email' },
    { label: 'Date Added', key: 'dateAdded' },
  ],
  page: 0,
  size: 10,
  searchParams: new URLSearchParams(),
  setSearchParams: jest.fn(),
  state: {
    showEditForm: false,
    showDelModal: true,
    selectedEmp: { firstName: 'John', lastName: 'Doe' },
  },
  setState: jest.fn(),
  handleEdit: jest.fn(),
  handleUpdate: jest.fn(),
  handleDeleteModal: jest.fn(),
  handleDelete: jest.fn(),
};

beforeEach(() => {
  (useEmployees as jest.Mock).mockReturnValue(mockEmployeesData);
});

test('renders BackOfficeViewEmployees correctly', () => {
  const { container } = render(
    <MemoryRouter>
      <BackOfficeViewEmployees />
    </MemoryRouter>,
  );
  expect(container).toMatchSnapshot();
});

test('renders headers correctly', () => {
  render(
    <MemoryRouter>
      <BackOfficeViewEmployees />
    </MemoryRouter>,
  );

  expect(screen.getByText('Employees List')).toBeInTheDocument();
  expect(screen.getByText('Employee Information')).toBeInTheDocument();
  expect(screen.getByText('Add Employee')).toBeInTheDocument();
});

test('renders employee data in table', async () => {
  render(
    <MemoryRouter>
      <BackOfficeViewEmployees />
    </MemoryRouter>,
  );

  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('2024-04-01')).toBeInTheDocument();
  });
});

test('triggers edit employee when edit button is clicked', () => {
  render(
    <MemoryRouter>
      <BackOfficeViewEmployees />
    </MemoryRouter>,
  );

  const editButton = screen.getByText('Edit');
  fireEvent.click(editButton);
  expect(mockEmployeesData.handleEdit).toHaveBeenCalled();
});

test('triggers delete employee modal when delete button is clicked', () => {
  render(
    <MemoryRouter>
      <BackOfficeViewEmployees />
    </MemoryRouter>,
  );

  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);
  expect(mockEmployeesData.handleDeleteModal).toHaveBeenCalled();
});

test('confirms delete employee and triggers handleDelete', async () => {
  render(
    <MemoryRouter>
      <BackOfficeViewEmployees />
    </MemoryRouter>,
  );

  const employeesBeforeDelete = screen.getAllByTestId('table-row');
  expect(employeesBeforeDelete).toHaveLength(1);

  const deleteButton = screen.getAllByRole('button', { name: 'Delete' })[0];
  fireEvent.click(deleteButton);

  expect(mockEmployeesData.handleDeleteModal).toHaveBeenCalled();

  await waitFor(() => screen.debug());

  const modalTitle = screen.getAllByText(/Delete Employee/i)[0];
  expect(modalTitle).toBeInTheDocument();

  const confirmDeleteButton = screen.getByRole('button', { name: 'Delete' });
  fireEvent.click(confirmDeleteButton);
});

test('cancels delete employee', () => {
  render(
    <MemoryRouter>
      <BackOfficeViewEmployees />
    </MemoryRouter>,
  );

  const employeesBeforeDelete = screen.getAllByTestId('table-row');
  expect(employeesBeforeDelete).toHaveLength(1);

  const deleteButton = screen.getByRole('button', { name: 'Delete' });
  fireEvent.click(deleteButton);

  const cancelButton = screen.getAllByRole('button', { name: 'Cancel' })[0];
  fireEvent.click(cancelButton);

  expect(mockEmployeesData.handleDeleteModal).toHaveBeenCalled();
});

test('confirms edit employee and triggers handleEdit', async () => {
  render(
    <MemoryRouter>
      <BackOfficeViewEmployees />
    </MemoryRouter>,
  );

  const employeesBeforeEdit = screen.getAllByTestId('table-row');
  expect(employeesBeforeEdit).toHaveLength(1);

  const editButton = screen.getByRole('button', { name: 'Edit' });
  fireEvent.click(editButton);

  const confirmEditButton = screen.getByRole('button', { name: 'Edit' });
  fireEvent.click(confirmEditButton);
});
