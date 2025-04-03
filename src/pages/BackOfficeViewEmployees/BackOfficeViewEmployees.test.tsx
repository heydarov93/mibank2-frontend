import { render, screen, fireEvent } from '@testing-library/react';

import BackOfficeViewEmployees from './BackOfficeViewEmployees';

import {
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useViewEmployeeQuery,
} from 'api/employeeController';

import '@testing-library/jest-dom';

import { MemoryRouter } from 'react-router-dom';

jest.mock('api/employeeController', () => ({
  useViewEmployeeQuery: jest.fn(),
  useUpdateEmployeeMutation: jest.fn(() => [jest.fn()]),
  useDeleteEmployeeMutation: jest.fn(() => [jest.fn()]),
}));

jest.mock('components/molecules/SearchField/SearchField', () => ({
  __esModule: true,
  default: jest.fn(() => <input data-testid="search-field" />),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
  }),
}));

const mockSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [
    new URLSearchParams({
      page: '0',
      size: '10',
      sortDateAdded: '',
      sortLastName: '',
    }),
    mockSetSearchParams,
  ],
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
    (useUpdateEmployeeMutation as jest.Mock).mockReturnValue([jest.fn()]);
    (useDeleteEmployeeMutation as jest.Mock).mockReturnValue([jest.fn()]);
  });

  test('clicking "Add Employee" button', () => {
    const { container } = render(
      <MemoryRouter>
        <BackOfficeViewEmployees />
      </MemoryRouter>,
    );
    expect(container).toMatchSnapshot();
  });

  test('renders headers and table structure correctly', () => {
    render(
      <MemoryRouter>
        <BackOfficeViewEmployees />
      </MemoryRouter>,
    );

    expect(screen.getByText('header.employeesList')).toBeInTheDocument();
    expect(screen.getByText('header.employeesInfo')).toBeInTheDocument();
    expect(screen.getByText('header.addEmployee')).toBeInTheDocument();

    expect(screen.getByText('employeeList.firstName')).toBeInTheDocument();
    expect(screen.getByText('employeeList.lastName')).toBeInTheDocument();
    expect(screen.getByText('employeeList.role')).toBeInTheDocument();
    expect(screen.getByText('employeeList.email')).toBeInTheDocument();
    expect(screen.getByText('employeeList.addedDate')).toBeInTheDocument();
  });

  test('clicking "Add Employee" button', () => {
    render(
      <MemoryRouter>
        <BackOfficeViewEmployees />
      </MemoryRouter>,
    );
    const addButton = screen.getByText('header.addEmployee');

    fireEvent.click(addButton);
    expect(addButton).toBeInTheDocument();
  });
});
