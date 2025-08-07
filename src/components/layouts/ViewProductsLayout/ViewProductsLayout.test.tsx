import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import * as ReactHookForm from 'react-hook-form';

import { ViewProductsLayout } from './ViewProductsLayout';

import { useDeleteDepositMutation } from 'api/services/deposit-service/deposits.api';
import { useGetProductsQuery } from 'api/services/deposit-service/products.api';
import { useProductActions, useProductFilters } from 'hooks';
import { ITableData } from 'models/ITable';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}));

jest.mock('api/services/deposit-service/products.api');
jest.mock('api/services/deposit-service/deposits.api');
jest.mock('hooks/product/useProductActions');
jest.mock('hooks/product/useProductFilters');

jest.mock('@mui/material', () => {
  const actual = jest.requireActual('@mui/material');
  return { ...actual, debounce: (fn: (inputValue: string) => void) => fn };
});

jest.mock('components/molecules', () => ({
  BackOfficeViewHeader: ({
    btnContent,
    primaryHeader,
    secondaryHeader,
  }: {
    btnContent: string;
    primaryHeader: string;
    secondaryHeader: string;
  }) => (
    <div>
      <h1>{primaryHeader}</h1>
      <h3>{secondaryHeader}</h3>
      <button>{btnContent}</button>
    </div>
  ),
  WarningWindow: ({
    onCancelClick,
    isError,
    errorMessage,
    title,
    body,
  }: {
    isError: boolean;
    errorMessage: string;
    onCancelClick: () => void;
    title: string;
    body: string;
  }) => (
    <div data-testid="warning-window">
      <button onClick={onCancelClick}>Cancel</button>
      <h1>{title}</h1>
      <p>{body}</p>
      {isError && <p>{errorMessage}</p>}
    </div>
  ),
  ConfirmationWindow: ({
    onClose,
    title,
    body,
  }: {
    onClose: () => void;
    title: string;
    body: string;
  }) => (
    <div data-testid="confirmation-window">
      <button onClick={onClose}>Back</button>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  ),
}));
jest.mock('components/organisms', () => ({
  ProductsSearchContainer: ({
    showNoMatches,
    onSearchEnter,
    onViewAll,
  }: {
    showNoMatches: boolean;
    onSearchEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onViewAll: () => void;
  }) => (
    <div>
      <button onClick={onViewAll}>View All</button>
      <input data-testid="search-input" onKeyDown={onSearchEnter} />
      {showNoMatches && <div>No matches found</div>}
    </div>
  ),
  BackOfficeTable: ({
    tableBody,
    isLoading,
    onDeleteClick,
    onEditClick,
  }: {
    tableBody: Partial<ITableData>[];
    isLoading: boolean;
    onDeleteClick: (product: Partial<ITableData>) => void;
    onEditClick: (product: Partial<ITableData>) => void;
  }) => (
    <div data-testid="table">
      {isLoading
        ? 'Loading...'
        : tableBody.map((product: Partial<ITableData>) => (
            <div key={product.id}>
              <span>{product.productName}</span>
              <button onClick={() => onDeleteClick(product)}>Delete</button>
              <button onClick={() => onEditClick(product)}>Edit</button>
            </div>
          ))}
    </div>
  ),
  DepositEditForm: ({ handleClose }: { handleClose: () => void }) => (
    <div data-testid="deposit-edit-form">
      <button onClick={handleClose}>Close</button>
    </div>
  ),
  CardEditForm: ({ handleClose }: { handleClose: () => void }) => (
    <div data-testid="card-edit-form">
      <button onClick={handleClose}>Close</button>
    </div>
  ),
}));

const mockProducts = [
  { id: 1, productName: 'Product A', productType: 'DEPOSIT' },
];
const refetchMock = jest.fn();
const deleteMock = jest.fn().mockResolvedValue({});
const manageHandlers = {
  handleDelete: jest.fn(),
  handleDeleteSuccess: jest.fn(),
  handleDeleteError: jest.fn(),
  handleEdit: jest.fn(),
  handleSuccessfulUpdate: jest.fn(),
  handleError: jest.fn(),
  handleClose: jest.fn(),
  handlePageChange: jest.fn(),
  handlePageSizeChange: jest.fn(),
  closeDeleteWindow: jest.fn(),
  closeConfirmationWindow: jest.fn(),
};
const defaultState = {
  page: 1,
  pageSize: 10,
  isDepositFormVisible: false,
  isEditFormVisible: false,
  isConfirmationWindowVisible: false,
  warningBody: '',
  warningTitle: '',
  errorMessage: '',
  isDeleteVisible: false,
  confirmationBody: '',
  confirmationTitle: '',
  formData: null,
  selectedProduct: null,
};

describe('ViewProductsLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: { 1: mockProducts },
      isLoading: false,
      refetch: refetchMock,
    });

    (useDeleteDepositMutation as jest.Mock).mockReturnValue([
      deleteMock,
      { isLoading: false, isError: false },
    ]);

    (useProductActions as jest.Mock).mockReturnValue({
      state: defaultState,
      ...manageHandlers,
    });

    (useProductFilters as jest.Mock).mockReturnValue({
      filteredTableBody: () => mockProducts,
    });

    (ReactHookForm.useForm as jest.Mock).mockReturnValue({
      control: {},
      setValue: jest.fn(),
      watch: () => 'foo',
    });
  });

  describe('Layout', () => {
    it('renders header with create button', () => {
      render(<ViewProductsLayout />);
      expect(
        screen.getByRole('button', { name: 'header.createBtnContent' }),
      ).toBeInTheDocument();
    });

    it('renders the search container and table', () => {
      render(<ViewProductsLayout />);
      expect(screen.getByRole('button', { name: 'View All' })).toBeVisible();
      expect(screen.getByTestId('table')).toBeInTheDocument();
    });
  });

  describe('Data & Table', () => {
    it('shows loading state in table when products are loading', () => {
      (useGetProductsQuery as jest.Mock).mockReturnValueOnce({
        data: undefined,
        isLoading: true,
        refetch: refetchMock,
      });
      render(<ViewProductsLayout />);
      expect(screen.getByTestId('table')).toHaveTextContent('Loading...');
    });

    it('renders a row for each product', () => {
      render(<ViewProductsLayout />);
      expect(screen.getByText('Product A')).toBeInTheDocument();
    });
  });

  describe('Search', () => {
    it('calls refetch when "View All" is clicked', () => {
      render(<ViewProductsLayout />);
      fireEvent.click(screen.getByRole('button', { name: 'View All' }));
      expect(refetchMock).toHaveBeenCalled();
    });
  });

  describe('Actions', () => {
    it('calls handleDelete when Delete button is clicked', () => {
      render(<ViewProductsLayout />);
      fireEvent.click(screen.getByRole('button', { name: /Delete/i }));
      expect(manageHandlers.handleDelete).toHaveBeenCalledWith(mockProducts[0]);
    });

    it('calls handleEdit when Edit button is clicked', () => {
      render(<ViewProductsLayout />);
      fireEvent.click(screen.getByRole('button', { name: /Edit/i }));
      expect(manageHandlers.handleEdit).toHaveBeenCalledWith(mockProducts[0]);
    });
  });
});
