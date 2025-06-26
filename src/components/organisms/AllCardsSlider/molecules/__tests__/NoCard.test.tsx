import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NoCard } from '../NoCard';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        emptyStateDescription: 'No cards available',
        addButton: 'Add Card',
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock('components/atoms', () => ({
  NoCardIcon: () => <div data-testid="no-card-icon">No Card Icon</div>,
}));

jest.mock('components/organisms', () => ({
  IssueCardModal: ({
    open,
    onClose,
  }: {
    open: boolean;
    onClose: () => void;
  }) =>
    open ? (
      <div data-testid="issue-card-modal" role="dialog" aria-modal="true">
        <h2>Issue New Card</h2>
        <button data-testid="modal-close" onClick={onClose}>
          Close
        </button>
      </div>
    ) : null,
}));

jest.mock('hooks/useDisclosure', () => {
  const React = jest.requireActual('react');
  return function useDisclosure() {
    const [isOpen, setIsOpen] = React.useState(false);
    return {
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    };
  };
});

const renderNoCard = () => {
  return render(
    <ThemeProvider theme={theme}>
      <NoCard />
    </ThemeProvider>,
  );
};

describe('NoCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render the empty state structure', () => {
      renderNoCard();

      expect(screen.getByTestId('empty-container')).toBeInTheDocument();
      expect(screen.getByTestId('no-card-icon')).toBeInTheDocument();
      expect(screen.getByTestId('subtitle')).toBeInTheDocument();
      expect(screen.getByTestId('add-button')).toBeInTheDocument();
      expect(screen.getByTestId('add-icon')).toBeInTheDocument();
    });

    it('should display translated empty state message', () => {
      renderNoCard();

      expect(screen.getByText('No cards available')).toBeInTheDocument();
    });

    it('should display translated add button text with icon', () => {
      renderNoCard();

      const addButton = screen.getByRole('button', { name: /add card/i });
      expect(addButton).toBeInTheDocument();
      expect(screen.getByTestId('add-icon')).toBeInTheDocument();
    });

    it('should not show modal initially', () => {
      renderNoCard();

      expect(screen.queryByTestId('issue-card-modal')).not.toBeInTheDocument();
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Modal interaction', () => {
    it('should open modal when add button is clicked', async () => {
      renderNoCard();

      const addButton = screen.getByRole('button', { name: /add card/i });
      await userEvent.click(addButton);

      expect(screen.getByTestId('issue-card-modal')).toBeInTheDocument();
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Issue New Card')).toBeInTheDocument();
    });

    it('should close modal when close button is clicked', async () => {
      renderNoCard();

      await userEvent.click(screen.getByRole('button', { name: /add card/i }));
      expect(screen.getByTestId('issue-card-modal')).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('modal-close'));
      expect(screen.queryByTestId('issue-card-modal')).not.toBeInTheDocument();
    });

    it('should handle multiple open/close cycles', async () => {
      renderNoCard();
      const addButton = screen.getByRole('button', { name: /add card/i });

      await userEvent.click(addButton);
      expect(screen.getByTestId('issue-card-modal')).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('modal-close'));
      expect(screen.queryByTestId('issue-card-modal')).not.toBeInTheDocument();

      await userEvent.click(addButton);
      expect(screen.getByTestId('issue-card-modal')).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('modal-close'));
      expect(screen.queryByTestId('issue-card-modal')).not.toBeInTheDocument();
    });
  });

  describe('Component integration', () => {
    it('should pass correct props to IssueCardModal', async () => {
      renderNoCard();

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

      await userEvent.click(screen.getByRole('button', { name: /add card/i }));

      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });

    it('should use useDisclosure hook correctly', async () => {
      renderNoCard();

      const addButton = screen.getByRole('button', { name: /add card/i });

      expect(screen.queryByTestId('issue-card-modal')).not.toBeInTheDocument();

      await userEvent.click(addButton);
      expect(screen.getByTestId('issue-card-modal')).toBeInTheDocument();

      await userEvent.click(screen.getByTestId('modal-close'));
      expect(screen.queryByTestId('issue-card-modal')).not.toBeInTheDocument();
    });
  });
});
