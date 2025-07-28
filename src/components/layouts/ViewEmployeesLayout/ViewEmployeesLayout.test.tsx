import { render, screen } from '@testing-library/react';

import { ViewEmployeesLayout } from './ViewEmployeesLayout';

import useEmployees from 'hooks/useEmployee';
import { TableData } from 'models/ITableData';

jest.mock('hooks/useEmployee');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));
jest.mock('constants/navigation/routePaths', () => ({
  TO_BACK_OFFICE_CREATE_EMPLOYEE: '/back-office/create-employee',
}));

jest.mock('components/molecules', () => ({
  ConfirmationWindow: ({ title, body }: { title: string; body: string }) => (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  ),
  BackOfficeViewHeader: ({
    primaryHeader,
    secondaryHeader,
    btnContent,
  }: {
    primaryHeader: string;
    secondaryHeader: string;
    btnContent: string;
  }) => (
    <div>
      <h1>{primaryHeader}</h1>
      <h2>{secondaryHeader}</h2>
      <button>{btnContent}</button>
    </div>
  ),
  WarningWindow: () => <div>Warning Window</div>,
  FailWindow: ({ title, body }: { title: string; body: string }) => (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  ),
}));
jest.mock('components/organisms', () => ({
  BackOfficeTable: ({ tableBody }: { tableBody: Partial<TableData>[] }) => (
    <div>Table rows: {tableBody.length}</div>
  ),
  EmployeesSearchContainer: ({ showNoMatches }: { showNoMatches: boolean }) =>
    showNoMatches ? <div>No matches found</div> : null,
  EmployeeEditForm: () => <form>Edit Form</form>,
}));

const defaultState = {
  tableData: [{ id: 1, name: 'John Doe' }],
  tableHead: ['ID', 'Name'],
  page: 1,
  size: 10,
  searchValue: '',
  searchParams: new URLSearchParams(),
  totalItems: 1,
  control: {},
  setSearchParams: jest.fn(),
  state: {
    showEditForm: false,
    failMsgModal: false,
    successMsgModal: false,
    showDelModal: false,
    actionMsg: 'msg',
    actionMsgBody: 'body',
    selectedEmp: { id: 1, name: 'John Doe' },
  },
  setState: jest.fn(),
  handleEdit: jest.fn(),
  handleUpdate: jest.fn(),
  handleDeleteModal: jest.fn(),
  handleDelete: jest.fn(),
  handleViewAll: jest.fn(),
  handleSearchEnter: jest.fn(),
};
describe('ViewEmployeesLayout', () => {
  beforeEach(() => {
    (useEmployees as jest.Mock).mockReturnValue(defaultState);
  });

  describe('Header', () => {
    it('renders the view header with correct text and button', () => {
      render(<ViewEmployeesLayout />);
      expect(screen.getByText('header.employeesList')).toBeInTheDocument();
      expect(screen.getByText('header.employeesInfo')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'header.addEmployee' }),
      ).toBeInTheDocument();
    });
  });

  describe('Search and Table', () => {
    it('renders search container and table with data', () => {
      render(<ViewEmployeesLayout />);
      expect(screen.getByText('Table rows: 1')).toBeInTheDocument();
    });

    it('shows no matches when searchValue is present but no data', () => {
      const hookReturn = {
        ...defaultState,
        searchValue: 'test',
        tableData: [],
      };
      (useEmployees as jest.Mock).mockReturnValue(hookReturn);
      render(<ViewEmployeesLayout />);
      expect(screen.getByText('No matches found')).toBeInTheDocument();
      expect(screen.getByText('Table rows: 0')).toBeInTheDocument();
    });
  });

  describe('Conditional Modals', () => {
    it('renders edit form when showEditForm is true', () => {
      const hookReturn = {
        ...defaultState,
        state: { ...defaultState.state, showEditForm: true },
      };
      (useEmployees as jest.Mock).mockReturnValue(hookReturn);
      render(<ViewEmployeesLayout />);
      expect(screen.getByText('Edit Form')).toBeInTheDocument();
    });

    it('renders fail window when failMsgModal is true', () => {
      const hookReturn = {
        ...defaultState,
        state: { ...defaultState.state, failMsgModal: true },
      };
      (useEmployees as jest.Mock).mockReturnValue(hookReturn);
      render(<ViewEmployeesLayout />);
      expect(
        screen.getByText(`${hookReturn.state.actionMsg}`),
      ).toBeInTheDocument();
    });

    it('renders confirmation window when successMsgModal is true', () => {
      const hookReturn = {
        ...defaultState,
        state: { ...defaultState.state, successMsgModal: true },
      };
      (useEmployees as jest.Mock).mockReturnValue(hookReturn);
      render(<ViewEmployeesLayout />);
      expect(
        screen.getByText(`${hookReturn.state.actionMsg}`),
      ).toBeInTheDocument();
    });

    it('renders delete warning when showDelModal is true', () => {
      const hookReturn = {
        ...defaultState,
        state: { ...defaultState.state, showDelModal: true },
      };
      (useEmployees as jest.Mock).mockReturnValue(hookReturn);
      render(<ViewEmployeesLayout />);
      expect(screen.getByText('Warning Window')).toBeInTheDocument();
    });
  });
});
