import { render, screen, fireEvent } from '@testing-library/react';

import { OpenBusinessAccountForm } from './OpenBusinessAccountForm';

interface SxProp {
  mt?: number;
  [key: string]: unknown;
}

interface OpenBusinessAccountSelectsProps {
  sx?: SxProp;
  'data-testid'?: string;
  'data-sx'?: string;
}

interface BusinessSelectedCardInfoProps {
  onEdit: () => void;
  sx?: SxProp;
  'data-testid'?: string;
  'data-sx'?: string;
}

interface OpenBusinessAccountActionsProps {
  onCancel: () => void;
  sx?: SxProp;
  'data-testid'?: string;
  'data-sx'?: string;
}

interface FormProps {
  isDataFilled: boolean;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onEdit: () => void;
}

jest.mock('../OpenBusinessAccountSelects/OpenBusinessAccountSelects', () => ({
  OpenBusinessAccountSelects: ({
    sx,
    ...props
  }: OpenBusinessAccountSelectsProps) => (
    <div data-testid="account-selects" data-sx={JSON.stringify(sx)} {...props}>
      Account Selects
    </div>
  ),
}));

jest.mock('../BusinessSelectedCardInfo/BusinessSelectedCardInfo', () => ({
  BusinessSelectedCardInfo: ({
    onEdit,
    sx,
    ...props
  }: BusinessSelectedCardInfoProps) => (
    <div
      data-testid="selected-card-info"
      data-sx={JSON.stringify(sx)}
      {...props}
    >
      Selected Card Info
      <button onClick={onEdit} data-testid="edit-button">
        Edit
      </button>
    </div>
  ),
}));

jest.mock('../OpenBusinessAccountActions/OpenBusinessAccountActions', () => ({
  OpenBusinessAccountActions: ({
    onCancel,
    sx,
    ...props
  }: OpenBusinessAccountActionsProps) => (
    <div data-testid="account-actions" data-sx={JSON.stringify(sx)} {...props}>
      Account Actions
      <button onClick={onCancel} data-testid="cancel-button">
        Cancel
      </button>
    </div>
  ),
}));

const defaultProps: FormProps = {
  isDataFilled: false,
  onCancel: jest.fn(),
  onSubmit: jest.fn(),
  onEdit: jest.fn(),
};

describe('OpenBusinessAccountForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Form structure', () => {
    it('renders form with required components', () => {
      render(<OpenBusinessAccountForm {...defaultProps} />);

      expect(
        screen.getByTestId('open-bussiness-account-form'),
      ).toBeInTheDocument();
      expect(screen.getByTestId('account-selects')).toBeInTheDocument();
      expect(screen.getByTestId('account-actions')).toBeInTheDocument();
    });

    it('applies correct styling to components', () => {
      render(<OpenBusinessAccountForm {...defaultProps} />);

      expect(screen.getByTestId('account-selects')).toHaveAttribute(
        'data-sx',
        JSON.stringify({ mt: 3 }),
      );
      expect(screen.getByTestId('account-actions')).toHaveAttribute(
        'data-sx',
        JSON.stringify({ mt: 4 }),
      );
    });
  });

  describe('Conditional rendering', () => {
    it('does not show selected card info when data is not filled', () => {
      render(
        <OpenBusinessAccountForm {...defaultProps} isDataFilled={false} />,
      );

      expect(
        screen.queryByTestId('selected-card-info'),
      ).not.toBeInTheDocument();
    });

    it('shows selected card info when data is filled', () => {
      render(<OpenBusinessAccountForm {...defaultProps} isDataFilled={true} />);

      expect(screen.getByTestId('selected-card-info')).toBeInTheDocument();
      expect(screen.getByTestId('selected-card-info')).toHaveAttribute(
        'data-sx',
        JSON.stringify({ mt: 4 }),
      );
    });
  });

  describe('Form interactions', () => {
    it('calls onSubmit when form is submitted', () => {
      const mockOnSubmit = jest.fn((e: React.FormEvent<HTMLFormElement>) =>
        e.preventDefault(),
      );
      render(
        <OpenBusinessAccountForm {...defaultProps} onSubmit={mockOnSubmit} />,
      );

      fireEvent.submit(screen.getByTestId('open-bussiness-account-form'));

      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      expect(mockOnSubmit).toHaveBeenCalledWith(expect.any(Object));
    });

    it('calls onCancel when cancel button is clicked', () => {
      const mockOnCancel = jest.fn();
      render(
        <OpenBusinessAccountForm {...defaultProps} onCancel={mockOnCancel} />,
      );

      fireEvent.click(screen.getByTestId('cancel-button'));

      expect(mockOnCancel).toHaveBeenCalledTimes(1);
    });

    it('calls onEdit when edit button is clicked', () => {
      const mockOnEdit = jest.fn();
      render(
        <OpenBusinessAccountForm
          {...defaultProps}
          isDataFilled={true}
          onEdit={mockOnEdit}
        />,
      );

      fireEvent.click(screen.getByTestId('edit-button'));

      expect(mockOnEdit).toHaveBeenCalledTimes(1);
    });
  });

  describe('State changes', () => {
    it('shows card info when isDataFilled changes from false to true', () => {
      const { rerender } = render(
        <OpenBusinessAccountForm {...defaultProps} isDataFilled={false} />,
      );

      expect(
        screen.queryByTestId('selected-card-info'),
      ).not.toBeInTheDocument();

      rerender(
        <OpenBusinessAccountForm {...defaultProps} isDataFilled={true} />,
      );

      expect(screen.getByTestId('selected-card-info')).toBeInTheDocument();
    });

    it('hides card info when isDataFilled changes from true to false', () => {
      const { rerender } = render(
        <OpenBusinessAccountForm {...defaultProps} isDataFilled={true} />,
      );

      expect(screen.getByTestId('selected-card-info')).toBeInTheDocument();

      rerender(
        <OpenBusinessAccountForm {...defaultProps} isDataFilled={false} />,
      );

      expect(
        screen.queryByTestId('selected-card-info'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Component integration', () => {
    it('passes correct props to child components', () => {
      const mockOnCancel = jest.fn();
      const mockOnEdit = jest.fn();

      render(
        <OpenBusinessAccountForm
          {...defaultProps}
          isDataFilled={true}
          onCancel={mockOnCancel}
          onEdit={mockOnEdit}
        />,
      );

      expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
      expect(screen.getByTestId('edit-button')).toBeInTheDocument();
    });

    it('maintains proper component hierarchy', () => {
      render(<OpenBusinessAccountForm {...defaultProps} isDataFilled={true} />);

      const form = screen.getByTestId('open-bussiness-account-form');
      const accountSelects = screen.getByTestId('account-selects');
      const selectedCardInfo = screen.getByTestId('selected-card-info');
      const accountActions = screen.getByTestId('account-actions');

      expect(form).toContainElement(accountSelects);
      expect(form).toContainElement(selectedCardInfo);
      expect(form).toContainElement(accountActions);
    });

    it('handles prop updates correctly', () => {
      const { rerender } = render(
        <OpenBusinessAccountForm {...defaultProps} isDataFilled={false} />,
      );

      expect(
        screen.queryByTestId('selected-card-info'),
      ).not.toBeInTheDocument();

      rerender(
        <OpenBusinessAccountForm {...defaultProps} isDataFilled={true} />,
      );

      expect(screen.getByTestId('selected-card-info')).toBeInTheDocument();
    });
  });
});
