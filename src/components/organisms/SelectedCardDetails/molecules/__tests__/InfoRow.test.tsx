import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';

import InfoRow from '../InfoRow';

import { theme } from 'theme/theme';

jest.mock('@mui/icons-material', () => ({
  ContentCopy: () => <span data-testid="copy-icon">ContentCopy</span>,
  Visibility: () => <span data-testid="visibility-icon">Visibility</span>,
  VisibilityOff: () => (
    <span data-testid="visibility-off-icon">VisibilityOff</span>
  ),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const defaultProps = {
  label: 'Test Label',
  value: 'Test Value',
};

describe('InfoRow Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render label and value correctly', () => {
      renderWithTheme(<InfoRow {...defaultProps} />);

      expect(screen.getByTestId('info-label')).toHaveTextContent('Test Label');
      expect(screen.getByTestId('info-text')).toHaveTextContent('Test Value');
    });

    it('should render with status when provided', () => {
      renderWithTheme(<InfoRow {...defaultProps} status="Active" />);

      const infoText = screen.getByTestId('info-text');
      expect(infoText).toHaveAttribute('data-status', 'Active');
    });

    it('should render the correct container structure', () => {
      renderWithTheme(<InfoRow {...defaultProps} />);

      expect(screen.getByTestId('info-row')).toBeInTheDocument();
      expect(screen.getByTestId('info-value')).toBeInTheDocument();
    });
  });

  describe('Masked Text Functionality', () => {
    it('should render masked text when masked prop is true', () => {
      renderWithTheme(<InfoRow {...defaultProps} masked={true} />);

      expect(screen.getByTestId('masked-text')).toHaveTextContent('Test Value');
      expect(screen.queryByTestId('info-text')).not.toBeInTheDocument();
    });

    it('should render regular text when masked prop is false', () => {
      renderWithTheme(<InfoRow {...defaultProps} masked={false} />);

      expect(screen.getByTestId('info-text')).toHaveTextContent('Test Value');
      expect(screen.queryByTestId('masked-text')).not.toBeInTheDocument();
    });

    it('should render regular text when masked prop is not provided', () => {
      renderWithTheme(<InfoRow {...defaultProps} />);

      expect(screen.getByTestId('info-text')).toHaveTextContent('Test Value');
      expect(screen.queryByTestId('masked-text')).not.toBeInTheDocument();
    });
  });

  describe('Toggle Functionality', () => {
    it('should render visibility icon when onToggle is provided and showIcon is true', () => {
      const mockToggle = jest.fn();

      renderWithTheme(
        <InfoRow {...defaultProps} onToggle={mockToggle} showIcon={true} />,
      );

      expect(screen.getByTestId('visibility-icon')).toBeInTheDocument();
      expect(
        screen.queryByTestId('visibility-off-icon'),
      ).not.toBeInTheDocument();
    });

    it('should render visibility-off icon when onToggle is provided and showIcon is false', () => {
      const mockToggle = jest.fn();

      renderWithTheme(
        <InfoRow {...defaultProps} onToggle={mockToggle} showIcon={false} />,
      );

      expect(screen.getByTestId('visibility-off-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('visibility-icon')).not.toBeInTheDocument();
    });

    it('should call onToggle when toggle button is clicked', () => {
      const mockToggle = jest.fn();

      renderWithTheme(
        <InfoRow {...defaultProps} onToggle={mockToggle} showIcon={true} />,
      );

      const toggleButton = screen.getByTestId('toggle-action');
      fireEvent.click(toggleButton);

      expect(mockToggle).toHaveBeenCalledTimes(1);
    });

    it('should not render toggle button when onToggle is not provided', () => {
      renderWithTheme(<InfoRow {...defaultProps} />);

      expect(screen.queryByTestId('visibility-icon')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('visibility-off-icon'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Copy Functionality', () => {
    it('should render copy icon when onCopy is provided', () => {
      const mockCopy = jest.fn();

      renderWithTheme(<InfoRow {...defaultProps} onCopy={mockCopy} />);

      expect(screen.getByTestId('copy-icon')).toBeInTheDocument();
    });

    it('should call onCopy when copy button is clicked', () => {
      const mockCopy = jest.fn();

      renderWithTheme(<InfoRow {...defaultProps} onCopy={mockCopy} />);

      const copyButton = screen.getByTestId('copy-action');
      fireEvent.click(copyButton);

      expect(mockCopy).toHaveBeenCalledTimes(1);
    });

    it('should not render copy button when onCopy is not provided', () => {
      renderWithTheme(<InfoRow {...defaultProps} />);

      expect(screen.queryByTestId('copy-icon')).not.toBeInTheDocument();
    });
  });
});
