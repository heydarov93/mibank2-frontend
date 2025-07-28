import { render, screen, fireEvent } from '@testing-library/react';

import { InfoTabs } from './InfoTabs';

import { ECardInfoTab } from 'enums/ECardInfoTab';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('enums/ECardInfoTab', () => ({
  ECardInfoTab: {
    Transactions: 'transactions',
    Information: 'information',
    Settings: 'settings',
  },
}));

const mockOnTabChange = jest.fn();

const defaultProps = {
  activeTab: ECardInfoTab.Information,
  onTabChange: mockOnTabChange,
};

describe('InfoTabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders all three tabs', () => {
      render(<InfoTabs {...defaultProps} />);

      expect(screen.getByTestId('tab-transactions')).toBeInTheDocument();
      expect(screen.getByTestId('tab-information')).toBeInTheDocument();
      expect(screen.getByTestId('tab-settings')).toBeInTheDocument();
    });

    it('displays translated tab labels', () => {
      render(<InfoTabs {...defaultProps} />);

      expect(screen.getByText('transactionsTabLabel')).toBeInTheDocument();
      expect(screen.getByText('informationTabLabel')).toBeInTheDocument();
      expect(screen.getByText('settingsTabLabel')).toBeInTheDocument();
    });

    it('shows tabs with correct values', () => {
      render(<InfoTabs {...defaultProps} />);

      expect(screen.getByTestId('tab-transactions')).toHaveAttribute(
        'data-value',
        'transactions',
      );
      expect(screen.getByTestId('tab-information')).toHaveAttribute(
        'data-value',
        'information',
      );
      expect(screen.getByTestId('tab-settings')).toHaveAttribute(
        'data-value',
        'settings',
      );
    });
  });

  describe('Tab states', () => {
    it('disables transactions and settings tabs', () => {
      render(<InfoTabs {...defaultProps} />);

      expect(screen.getByTestId('tab-transactions')).toBeDisabled();
      expect(screen.getByTestId('tab-settings')).toBeDisabled();
    });

    it('enables information tab', () => {
      render(<InfoTabs {...defaultProps} />);

      expect(screen.getByTestId('tab-information')).not.toBeDisabled();
    });

    it('sets active tab correctly', () => {
      render(<InfoTabs {...defaultProps} />);

      expect(screen.getByTestId('info-tabs')).toHaveAttribute(
        'data-value',
        'information',
      );
    });

    it('updates active tab when prop changes', () => {
      const { rerender } = render(<InfoTabs {...defaultProps} />);

      rerender(
        <InfoTabs {...defaultProps} activeTab={ECardInfoTab.Settings} />,
      );

      expect(screen.getByTestId('info-tabs')).toHaveAttribute(
        'data-value',
        'settings',
      );
    });
  });

  describe('Tab interactions', () => {
    it('calls onTabChange when information tab is clicked', () => {
      render(
        <InfoTabs {...defaultProps} activeTab={ECardInfoTab.Transactions} />,
      );

      fireEvent.click(screen.getByTestId('tab-information'));

      expect(mockOnTabChange).toHaveBeenCalledWith(
        expect.any(Object),
        'information',
      );
    });

    it('does not call onTabChange when disabled tab is clicked', () => {
      render(<InfoTabs {...defaultProps} />);

      fireEvent.click(screen.getByTestId('tab-transactions'));

      expect(mockOnTabChange).not.toHaveBeenCalled();
    });
  });

  describe('Indicator display', () => {
    it('shows indicator when information tab is active', () => {
      render(
        <InfoTabs {...defaultProps} activeTab={ECardInfoTab.Information} />,
      );

      expect(screen.getByTestId('info-tabs')).toHaveAttribute(
        'data-indicator-display',
        'block',
      );
    });

    it('hides indicator when other tabs are active', () => {
      render(
        <InfoTabs {...defaultProps} activeTab={ECardInfoTab.Transactions} />,
      );

      expect(screen.getByTestId('info-tabs')).toHaveAttribute(
        'data-indicator-display',
        'none',
      );
    });
  });
});
