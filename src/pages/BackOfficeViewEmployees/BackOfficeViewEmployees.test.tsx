import { render, screen, fireEvent } from '@testing-library/react';

import BackOfficeViewEmployees from './BackOfficeViewEmployees';

import { useViewEmployeeQuery } from 'api/employeeController';

import '@testing-library/jest-dom';

jest.mock('api/employeeController', () => ({
  useViewEmployeeQuery: jest.fn(),
}));

jest.mock('components/molecules/SearchField/SearchField', () => ({
  __esModule: true,
  default: jest.fn(() => <input data-testid="search-field" />),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
  }),
}));

describe('BackOfficeViewEmployees Component', () => {
  const mockData = {
    content: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        role: 'Manager',
        email: 'john.doe@example.com',
        dateAdded: '2024-02-01T00:00:00.000Z',
      },
    ],
    totalElements: 1,
  };

  beforeEach(() => {
    (useViewEmployeeQuery as jest.Mock).mockReturnValue({ data: mockData });
  });

  test('clicking "Add Employee" button', () => {
    const { container } = render(<BackOfficeViewEmployees />);
    expect(container).toMatchSnapshot();
  });

  test('renders headers and table structure correctly', () => {
    render(<BackOfficeViewEmployees />);

    expect(screen.getByText('header.employeesList')).toBeInTheDocument();
    expect(screen.getByText('header.employeesInfo')).toBeInTheDocument();
    expect(screen.getByText('header.addEmployee')).toBeInTheDocument();

    expect(screen.getByText('employeeList.firstName')).toBeInTheDocument();
    expect(screen.getByText('employeeList.lastName')).toBeInTheDocument();
    expect(screen.getByText('employeeList.role')).toBeInTheDocument();
    expect(screen.getByText('employeeList.email')).toBeInTheDocument();
    expect(screen.getByText('employeeList.addedDate')).toBeInTheDocument();
  });

  test('renders employee data correctly', () => {
    render(<BackOfficeViewEmployees />);

    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('Manager')).toBeInTheDocument();
    expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    expect(screen.getByText('01/02/2024')).toBeInTheDocument();
  });

  test('clicking "Add Employee" button', () => {
    render(<BackOfficeViewEmployees />);
    const addButton = screen.getByText('header.addEmployee');

    fireEvent.click(addButton);
    expect(addButton).toBeInTheDocument();
  });
});
