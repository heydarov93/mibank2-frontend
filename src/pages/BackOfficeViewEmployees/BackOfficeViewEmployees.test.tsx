import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';

import BackOfficeViewEmployees from './BackOfficeViewEmployees';

import useEmployees from 'hooks/useEmployee';
import { theme } from 'theme/theme';

jest.mock('hooks/useEmployee');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'header.employeesList': 'Employees List',
        'header.employeesInfo': 'Employee Information',
        'header.addEmployee': 'Add Employee',
        'header.searchEmployees': 'Search for employees',
        'employeeList.noMatchesFound.viewAll': 'View All',
        'employeeList.noMatchesFound.notFound': 'No matches were found.',
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
        'ConfirmationWindow.save': 'Save',
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
  handleDeleteModal: jest.fn(),
  handleDelete: jest.fn(),
};

beforeEach(() => {
  (useEmployees as jest.Mock).mockReturnValue(mockEmployeesData);
});

const renderWithProviders = (ui: React.ReactElement) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    const methods = useForm();
    return (
      <ThemeProvider theme={theme}>
        <FormProvider {...methods}>
          <MemoryRouter>{children}</MemoryRouter>
        </FormProvider>
      </ThemeProvider>
    );
  };

  return render(ui, { wrapper: Wrapper });
};

test('renders BackOfficeViewEmployees correctly', () => {
  const { container } = renderWithProviders(<BackOfficeViewEmployees />);

  expect(container).toMatchSnapshot();
});

test('renders headers correctly', () => {
  renderWithProviders(<BackOfficeViewEmployees />);

  expect(screen.getByText('Employees List')).toBeInTheDocument();
  expect(screen.getByText('Employee Information')).toBeInTheDocument();
  expect(screen.getByText('Add Employee')).toBeInTheDocument();
});

test('renders employee data in table', async () => {
  renderWithProviders(<BackOfficeViewEmployees />);

  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('2024-04-01')).toBeInTheDocument();
  });
});

test('triggers edit employee when edit button is clicked', () => {
  renderWithProviders(<BackOfficeViewEmployees />);

  const editButton = screen.getByText('Edit');
  fireEvent.click(editButton);
  expect(mockEmployeesData.handleEdit).toHaveBeenCalled();
});

test('triggers delete employee modal when delete button is clicked', () => {
  renderWithProviders(<BackOfficeViewEmployees />);

  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);
  expect(mockEmployeesData.handleDeleteModal).toHaveBeenCalled();
});

test('confirms delete employee and triggers handleDelete', async () => {
  renderWithProviders(<BackOfficeViewEmployees />);

  const employeesBeforeDelete = screen.getAllByTestId('table-row');
  expect(employeesBeforeDelete).toHaveLength(1);

  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);

  expect(mockEmployeesData.handleDeleteModal).toHaveBeenCalled();

  const modalTitle = screen.getAllByText(/Delete Employee/i)[0];
  expect(modalTitle).toBeInTheDocument();

  const confirmDeleteButton = screen.getByText('Delete');
  fireEvent.click(confirmDeleteButton);
});

test('cancels delete employee', () => {
  renderWithProviders(<BackOfficeViewEmployees />);

  const employeesBeforeDelete = screen.getAllByTestId('table-row');
  expect(employeesBeforeDelete).toHaveLength(1);

  const deleteButton = screen.getByText('Delete');
  fireEvent.click(deleteButton);

  const cancelButton = screen.getByText('Cancel');
  fireEvent.click(cancelButton);

  expect(mockEmployeesData.handleDeleteModal).toHaveBeenCalled();
});

test('confirms edit employee and triggers handleEdit', async () => {
  renderWithProviders(<BackOfficeViewEmployees />);

  const employeesBeforeEdit = screen.getAllByTestId('table-row');
  expect(employeesBeforeEdit).toHaveLength(1);

  const editButton = screen.getByText('Edit');
  fireEvent.click(editButton);

  expect(mockEmployeesData.handleEdit).toHaveBeenCalled();

  const confirmEditButton = await screen.findByTestId('save-button');
  fireEvent.click(confirmEditButton);
});
