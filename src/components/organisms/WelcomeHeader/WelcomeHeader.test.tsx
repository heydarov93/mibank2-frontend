import { ThemeProvider } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';

import { WelcomeHeader } from './WelcomeHeader';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        personal: 'Personal',
        business: 'Business',
        aboutUs: 'About Us',
        contacts: 'Contacts',
        language: 'English',
      };
      return translations[key] || key;
    },
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

const mockOnSetActiveTab = jest.fn();
const defaultProps = {
  activeTab: 0,
  onTabChange: mockOnSetActiveTab,
};

const renderWithTheme = (props = defaultProps) => {
  return render(
    <ThemeProvider theme={theme}>
      <WelcomeHeader {...props} />
    </ThemeProvider>,
  );
};

describe('WelcomeHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Navigation tabs', () => {
    it('renders all navigation tabs', () => {
      renderWithTheme();

      expect(screen.getByText('Personal')).toBeInTheDocument();
      expect(screen.getByText('Business')).toBeInTheDocument();
      expect(screen.getByText('About Us')).toBeInTheDocument();
    });

    it('calls onSetActiveTab when tab is clicked', () => {
      renderWithTheme();

      fireEvent.click(screen.getByText('Business'));

      expect(mockOnSetActiveTab).toHaveBeenCalledWith(
        expect.any(Object),
        expect.any(Number),
      );
    });

    it('shows correct active tab', () => {
      renderWithTheme({ ...defaultProps, activeTab: 1 });

      const tabsContainer = screen.getByTestId('header-tab-list');
      expect(tabsContainer).toBeInTheDocument();
    });
  });

  describe('Right section elements', () => {
    it('renders search icon button', () => {
      renderWithTheme();

      const searchButton = screen.getByTestId('search-button');
      expect(searchButton).toBeInTheDocument();
    });

    it('renders contacts text', () => {
      renderWithTheme();

      expect(screen.getByText('Contacts')).toBeInTheDocument();
    });

    it('renders language dropdown trigger', () => {
      renderWithTheme();

      expect(screen.getByText('English')).toBeInTheDocument();
    });
  });

  describe('Language dropdown', () => {
    it('does not show language menu by default', () => {
      renderWithTheme();

      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });

    it('opens language menu when language text is clicked', () => {
      renderWithTheme();

      fireEvent.click(screen.getByText('English'));

      expect(screen.getByRole('menu')).toBeInTheDocument();
      expect(screen.getByRole('menuitem')).toBeInTheDocument();
    });

    it('closes language menu when menu item is clicked', () => {
      renderWithTheme();

      fireEvent.click(screen.getByText('English'));
      expect(screen.getByRole('menu')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('menuitem'));
      expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper tab accessibility attributes', () => {
      renderWithTheme();

      const personalTab = screen.getByText('Personal').closest('[role="tab"]');
      expect(personalTab).toHaveAttribute('id', 'tab-0');
      expect(personalTab).toHaveAttribute('aria-controls', 'tabpanel-0');
    });

    it('has proper tablist role', () => {
      renderWithTheme();

      expect(screen.getByRole('tablist')).toBeInTheDocument();
    });
  });
});
