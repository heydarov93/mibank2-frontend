import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import { BackOfficeTable } from './BackOfficeTable';

interface TableHeadItem {
  label: string;
  key: string;
}

describe('BackOfficeTable Component', () => {
  const tableHead: TableHeadItem[] = [
    { label: 'Product Name', key: 'productName' },
    { label: 'Status', key: 'productStatus' },
    { label: 'Date Added', key: 'dateAdded' },
  ];

  const tableBody = [
    {
      id: 1,
      productName: 'Product A',
      productStatus: 'Active',
      dateAdded: '2024-01-01',
    },
    {
      id: 2,
      productName: 'Product B',
      productStatus: 'Inactive',
      dateAdded: '2024-02-01',
    },
  ];

  const mockOnPageChange = jest.fn();
  const mockOnPageSizeChange = jest.fn();
  const mockOnDeleteClick = jest.fn();
  const mockOnEditClick = jest.fn();

  test('renders BackOfficeTable component', () => {
    const { container } = render(
      <BackOfficeTable
        tableHead={tableHead}
        tableBody={tableBody}
        totalItems={2}
        page={1}
        pageSize={10}
        onPageChange={mockOnPageChange}
        onPageSizeChange={mockOnPageSizeChange}
        onDeleteClick={mockOnDeleteClick}
        onEditClick={mockOnEditClick}
      />,
    );
    expect(container).toMatchSnapshot();
  });
  test('renders table headers correctly', () => {
    render(
      <BackOfficeTable
        tableHead={tableHead}
        tableBody={tableBody}
        totalItems={2}
        page={1}
        pageSize={10}
        onPageChange={mockOnPageChange}
        onPageSizeChange={mockOnPageSizeChange}
        onDeleteClick={mockOnDeleteClick}
        onEditClick={mockOnEditClick}
      />,
    );

    tableHead.forEach((head) => {
      expect(screen.getByText(head.label)).toBeInTheDocument();
    });
  });

  test('calls onDeleteClick when delete button is clicked', () => {
    render(
      <BackOfficeTable
        tableHead={tableHead}
        tableBody={tableBody}
        totalItems={2}
        page={1}
        pageSize={10}
        onDeleteClick={mockOnDeleteClick}
        onEditClick={mockOnEditClick}
      />,
    );

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    fireEvent.click(deleteButtons[0]);

    expect(mockOnDeleteClick).toHaveBeenCalled();
  });

  test('calls onEditClick when edit button is clicked', () => {
    render(
      <BackOfficeTable
        tableHead={tableHead}
        tableBody={tableBody}
        totalItems={2}
        page={1}
        pageSize={10}
        onDeleteClick={mockOnDeleteClick}
        onEditClick={mockOnEditClick}
      />,
    );

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]);

    expect(mockOnEditClick).toHaveBeenCalled();
  });

  test('renders empty rows when tableBody is less than 10 rows', () => {
    render(
      <BackOfficeTable
        tableHead={tableHead}
        tableBody={tableBody}
        totalItems={2}
        page={1}
        pageSize={10}
      />,
    );

    const emptyRows = screen.getAllByRole('row');
    expect(emptyRows.length).toBeGreaterThan(tableBody.length);
  });
});
