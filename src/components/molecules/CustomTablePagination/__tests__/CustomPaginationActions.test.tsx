import { ThemeProvider } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';

import CustomPaginationActions from '../CustomPaginationActions';

import { theme } from 'theme/theme';

jest.mock('components/atoms/LeftArrowButton/LeftArrowButton', () => {
  return function LeftArrowButton() {
    return <div data-testid="left-arrow" />;
  };
});

jest.mock('components/atoms/LeftArrowEndButton/LeftArrowEndButton', () => {
  return function LeftArrowEndButton() {
    return <div data-testid="left-arrow-end" />;
  };
});

jest.mock('components/atoms/RightArrowButton/RightArrowButton', () => {
  return function RightArrowButton() {
    return <div data-testid="right-arrow" />;
  };
});

jest.mock('components/atoms/RightArrowEndButton/RightArrowEndButton', () => {
  return function RightArrowEndButton() {
    return <div data-testid="right-arrow-end" />;
  };
});

jest.mock('../utils/colorUtils', () => ({
  getButtonColor: jest.fn(() => '#000000'),
  getTextColor: jest.fn(() => '#000000'),
}));

const defaultProps = {
  totalPages: 10,
  page: 5,
  rowsPerPage: 10,
  onPageChange: jest.fn(),
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('CustomPaginationActions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render pagination actions correctly', () => {
    renderWithTheme(<CustomPaginationActions {...defaultProps} />);

    expect(screen.getByTestId('pagination-actions')).toBeInTheDocument();
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument(); // page + 1
    expect(screen.getByText('of 10')).toBeInTheDocument();
    expect(screen.getByTestId('current-page')).toBeInTheDocument();
  });

  it('should handle navigation clicks correctly', async () => {
    renderWithTheme(<CustomPaginationActions {...defaultProps} />);

    const rightArrow = screen.getByTestId('right-arrow').closest('button');
    fireEvent.click(rightArrow!);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(
      expect.any(Object),
      6,
    );

    const leftArrow = screen.getByTestId('left-arrow').closest('button');
    fireEvent.click(leftArrow!);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(
      expect.any(Object),
      4,
    );

    const leftArrowEnd = screen.getByTestId('left-arrow-end').closest('button');
    fireEvent.click(leftArrowEnd!);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(
      expect.any(Object),
      0,
    );

    const rightArrowEnd = screen
      .getByTestId('right-arrow-end')
      .closest('button');
    fireEvent.click(rightArrowEnd!);
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(
      expect.any(Object),
      9,
    );
  });

  it('should disable buttons on first page', () => {
    renderWithTheme(<CustomPaginationActions {...defaultProps} page={0} />);

    const leftArrow = screen.getByTestId('left-arrow').closest('button');
    const leftArrowEnd = screen.getByTestId('left-arrow-end').closest('button');

    expect(leftArrow).toBeDisabled();
    expect(leftArrowEnd).toBeDisabled();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should disable buttons on last page', () => {
    renderWithTheme(<CustomPaginationActions {...defaultProps} page={9} />);

    const rightArrow = screen.getByTestId('right-arrow').closest('button');
    const rightArrowEnd = screen
      .getByTestId('right-arrow-end')
      .closest('button');

    expect(rightArrow).toBeDisabled();
    expect(rightArrowEnd).toBeDisabled();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('should handle single page scenario', () => {
    renderWithTheme(
      <CustomPaginationActions {...defaultProps} totalPages={1} page={0} />,
    );

    const leftArrow = screen.getByTestId('left-arrow').closest('button');
    const leftArrowEnd = screen.getByTestId('left-arrow-end').closest('button');
    const rightArrow = screen.getByTestId('right-arrow').closest('button');
    const rightArrowEnd = screen
      .getByTestId('right-arrow-end')
      .closest('button');

    expect(leftArrow).toBeDisabled();
    expect(leftArrowEnd).toBeDisabled();
    expect(rightArrow).toBeDisabled();
    expect(rightArrowEnd).toBeDisabled();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('of 1')).toBeInTheDocument();
  });

  it('should display correct page information', () => {
    renderWithTheme(
      <CustomPaginationActions {...defaultProps} page={2} totalPages={15} />,
    );

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('of 15')).toBeInTheDocument();
  });
});
