import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import CustomTablePagination from '../CustomTablePagination';

import { theme } from 'theme/theme';

jest.mock("constants/business/pagination", () => ({
  ITEMS_PER_PAGE_OPTIONS: [10, 20, 30],
}));

jest.mock('../CustomPaginationActions', () => {
  return function MockCustomPaginationActions({ page, onPageChange }: any) {
    return (
      <div data-testid="pagination-actions">
        <button
          onClick={(e) => onPageChange(e, page + 1)}
          data-testid="next-page"
        >
          Next
        </button>
        <span data-testid="current-page">{page + 1}</span>
      </div>
    );
  };
});

const defaultProps = {
  totalPages: 100,
  page: 2,
  rowsPerPage: 10,
  onPageChange: jest.fn(),
  onRowsPerPageChange: jest.fn(),
  pageDisplayText: '21 - 30 of 100 items',
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('CustomTablePagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render pagination component correctly', () => {
    renderWithTheme(<CustomTablePagination {...defaultProps} />);

    expect(screen.getByTestId('main-container')).toBeInTheDocument();
    expect(screen.getByTestId('count-select')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-actions')).toBeInTheDocument();
    expect(screen.getByText('itemsPerPage')).toBeInTheDocument();
    expect(screen.getByText('21 - 30 of 100 items')).toBeInTheDocument();
  });

  it('should not render when totalPages is 0', () => {
    renderWithTheme(<CustomTablePagination {...defaultProps} totalPages={0} />);

    expect(screen.queryByTestId('main-container')).not.toBeInTheDocument();
  });

  it('should display select component and options', async () => {
    renderWithTheme(<CustomTablePagination {...defaultProps} />);

    const select = screen.getByTestId('count-select');
    expect(select).toBeInTheDocument();

    await userEvent.click(select);
    
    const option = await screen.findByText('10');
    
    expect(option).toBeInTheDocument();
  });

  it('should handle page navigation', async () => {
    renderWithTheme(<CustomTablePagination {...defaultProps} />);

    expect(screen.getByTestId('current-page')).toHaveTextContent('3');

    const nextButton = screen.getByTestId('next-page');
    await userEvent.click(nextButton);

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(
      expect.any(Object),
      3,
    );
  });

  it('should not display pageDisplayText when not provided', () => {
    renderWithTheme(
      <CustomTablePagination {...defaultProps} pageDisplayText={undefined} />,
    );

    expect(screen.queryByText('21 - 30 of 100 items')).not.toBeInTheDocument();
  });

  it('should handle different rowsPerPage values', () => {
    renderWithTheme(
      <CustomTablePagination {...defaultProps} rowsPerPage={20} />,
    );

    const select = screen.getByTestId('count-select');
    expect(select).toBeInTheDocument();
  });
});