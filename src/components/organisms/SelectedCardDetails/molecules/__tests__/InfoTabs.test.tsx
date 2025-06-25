import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';

import InfoTabs from '../InfoTabs';

import { ECardInfoTab } from 'enums/ECardInfoTab';
import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        transactionsTabLabel: 'Transactions',
        informationTabLabel: 'Information',
        settingsTabLabel: 'Settings',
      };
      return translations[key] || key;
    },
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

const mockOnTabChange = jest.fn();
const defaultProps = {
  activeTab: ECardInfoTab.Information,
  onTabChange: mockOnTabChange,
};

describe('InfoTabs Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Rendering', () => {
    it('should render all three tabs with correct labels', () => {
      renderWithTheme(<InfoTabs {...defaultProps} />);

      expect(screen.getByText('Transactions')).toBeInTheDocument();
      expect(screen.getByText('Information')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('should pass activeTab value to StyledTabs', () => {
      renderWithTheme(<InfoTabs {...defaultProps} />);

      const infoTabs = screen.getByTestId('info-tabs');
      expect(infoTabs).toHaveAttribute('data-value', ECardInfoTab.Information);
    });

    it('should render tabs with correct values', () => {
      renderWithTheme(<InfoTabs {...defaultProps} />);

      expect(
        screen.getByTestId(`tab-${ECardInfoTab.Transactions}`),
      ).toHaveAttribute('data-value', ECardInfoTab.Transactions);
      expect(
        screen.getByTestId(`tab-${ECardInfoTab.Information}`),
      ).toHaveAttribute('data-value', ECardInfoTab.Information);
      expect(
        screen.getByTestId(`tab-${ECardInfoTab.Settings}`),
      ).toHaveAttribute('data-value', ECardInfoTab.Settings);
    });
  });

  describe('Tab States', () => {
    it('should disable Transactions tab', () => {
      renderWithTheme(<InfoTabs {...defaultProps} />);

      const transactionsTab = screen.getByTestId(
        `tab-${ECardInfoTab.Transactions}`,
      );
      expect(transactionsTab).toBeDisabled();
    });

    it('should enable Information tab', () => {
      renderWithTheme(<InfoTabs {...defaultProps} />);

      const informationTab = screen.getByTestId(
        `tab-${ECardInfoTab.Information}`,
      );
      expect(informationTab).not.toBeDisabled();
    });

    it('should disable Settings tab', () => {
      renderWithTheme(<InfoTabs {...defaultProps} />);

      const settingsTab = screen.getByTestId(`tab-${ECardInfoTab.Settings}`);
      expect(settingsTab).toBeDisabled();
    });
  });

  describe('Tab Indicator', () => {
    it('should show indicator when Information tab is active', () => {
      renderWithTheme(
        <InfoTabs {...defaultProps} activeTab={ECardInfoTab.Information} />,
      );

      const infoTabs = screen.getByTestId('info-tabs');
      expect(infoTabs).toHaveAttribute('data-indicator-display', 'block');
    });

    it('should hide indicator when Transactions tab is active', () => {
      renderWithTheme(
        <InfoTabs {...defaultProps} activeTab={ECardInfoTab.Transactions} />,
      );

      const infoTabs = screen.getByTestId('info-tabs');
      expect(infoTabs).toHaveAttribute('data-indicator-display', 'none');
    });

    it('should hide indicator when Settings tab is active', () => {
      renderWithTheme(
        <InfoTabs {...defaultProps} activeTab={ECardInfoTab.Settings} />,
      );

      const infoTabs = screen.getByTestId('info-tabs');
      expect(infoTabs).toHaveAttribute('data-indicator-display', 'none');
    });
  });

  describe('Tab Change Handler', () => {
    it('should not call onTabChange when the active tab is clicked', () => {
      const mockTabChange = jest.fn();
      renderWithTheme(
        <InfoTabs {...defaultProps} onTabChange={mockTabChange} />,
      );

      const infoTab = screen.getByTestId(`tab-${ECardInfoTab.Information}`);
      fireEvent.click(infoTab);

      expect(mockTabChange).not.toHaveBeenCalled();
    });

    it('should pass onTabChange prop to StyledTabs', () => {
      const mockTabChange = jest.fn();
      renderWithTheme(
        <InfoTabs {...defaultProps} onTabChange={mockTabChange} />,
      );
    });
  });

  describe('Different Active Tab States', () => {
    it('should render correctly when Transactions tab is active', () => {
      renderWithTheme(
        <InfoTabs {...defaultProps} activeTab={ECardInfoTab.Transactions} />,
      );

      const styledTabs = screen.getByTestId('info-tabs');
      expect(styledTabs).toHaveAttribute(
        'data-value',
        ECardInfoTab.Transactions,
      );
      expect(styledTabs).toHaveAttribute('data-indicator-display', 'none');
    });

    it('should render correctly when Settings tab is active', () => {
      renderWithTheme(
        <InfoTabs {...defaultProps} activeTab={ECardInfoTab.Information} />,
      );

      const styledTabs = screen.getByTestId('info-tabs');
      expect(styledTabs).toHaveAttribute(
        'data-value',
        ECardInfoTab.Information,
      );
      expect(styledTabs).toHaveAttribute('data-indicator-display', 'block');
    });
  });
});
