import { render, screen, fireEvent } from '@testing-library/react';

import { NoCard } from './NoCard';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('components/atoms', () => ({
  NoCardIcon: () => <div data-testid="no-card-icon" />,
}));

describe('NoCard', () => {
  const mockOpenModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders empty state content', () => {
      render(<NoCard openIssueCardModal={mockOpenModal} />);

      expect(screen.getByTestId('no-card-icon')).toBeInTheDocument();
      expect(screen.getByTestId('subtitle')).toHaveTextContent(
        'emptyStateDescription',
      );
      expect(screen.getByTestId('add-button')).toHaveTextContent('addButton');
    });
    it('displays add icon in button', () => {
      render(<NoCard openIssueCardModal={mockOpenModal} />);

      expect(screen.getByTestId('add-icon')).toBeInTheDocument();
    });
  });

  describe('User interactions', () => {
    it('calls openIssueCardModal when add button is clicked', () => {
      render(<NoCard openIssueCardModal={mockOpenModal} />);

      fireEvent.click(screen.getByTestId('add-button'));

      expect(mockOpenModal).toHaveBeenCalledTimes(1);
    });
  });
});
