import { fireEvent, render, screen } from '@testing-library/react';

import { AllCardsLayout } from './AllCardsLayout';

import { IUserBankCard } from 'models/IUser';

type TCardId = IUserBankCard['id'];

jest.mock('components/organisms', () => ({
  AllCardsSlider: ({
    onCardIdSelect,
    selectedCardId,
  }: {
    onCardIdSelect: (id: TCardId) => void;
    selectedCardId: TCardId;
  }) => (
    <div data-testid="mock-slider">
      <button onClick={() => onCardIdSelect('card-1')}>Select Card</button>
      <span>{selectedCardId}</span>
    </div>
  ),
  SelectedCardDetails: ({ selectedCardId }: { selectedCardId: TCardId }) => (
    <div data-testid="box-wrapper">
      <div data-testid="selected-card-details">{selectedCardId}</div>
    </div>
  ),
}));

describe('AllCardsLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      render(<AllCardsLayout />);
    });

    it('renders AllCardsSlider component', () => {
      expect(screen.getByTestId('mock-slider')).toBeInTheDocument();
    });

    it('does not show selected card details initially', () => {
      expect(screen.queryByTestId('fade-wrapper')).not.toBeVisible();
      expect(screen.queryByTestId('collapse-wrapper')).not.toBeVisible();
    });
  });

  describe('Card Selection Interaction', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      render(<AllCardsLayout />);
    });

    it('displays selected card details after selecting a card', async () => {
      await fireEvent.click(
        screen.getByRole('button', { name: /select card/i }),
      );

      expect(screen.getByTestId('collapse-wrapper')).toBeVisible();
      expect(screen.getByTestId('fade-wrapper')).toBeVisible();
      expect(screen.getByTestId('box-wrapper')).toBeInTheDocument();
      expect(screen.getByTestId('selected-card-details')).toHaveTextContent(
        'card-1',
      );
    });

    it('toggles off selected card when clicked again', async () => {
      const selectButton = screen.getByRole('button', { name: /select card/i });
      await fireEvent.click(selectButton);
      await fireEvent.click(selectButton);

      expect(screen.queryByTestId('fade-wrapper')).not.toBeVisible();
      expect(screen.queryByTestId('selected-card-details')).not.toBeVisible();
    });
  });
});
