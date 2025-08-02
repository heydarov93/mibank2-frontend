import { fireEvent, render, screen } from '@testing-library/react';
import { ReactNode, SyntheticEvent } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { WelcomeLayout } from './WelcomeLayout';

import { TLogoSize } from 'types/types';

jest.mock('components/atoms', () => ({
  Logo: ({ size }: { size: TLogoSize }) => (
    <div data-testid="logo">Logo {size}</div>
  ),
  TabPanel: ({
    children,
    value,
    index,
  }: {
    children: ReactNode;
    value: number;
    index: number;
  }) =>
    value === index ? (
      <div data-testid={`tab-panel-${index}`}>{children}</div>
    ) : null,
}));

jest.mock('components/organisms', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
  WelcomeHeader: ({
    activeTab,
    onTabChange,
  }: {
    activeTab: number;
    onTabChange: (event: SyntheticEvent, value: number) => void;
  }) => (
    <div data-testid="welcome-header">
      <button
        data-testid="tab-personal"
        onClick={(event) => onTabChange(event, 0)}
        aria-selected={activeTab === 0}
      >
        Personal
      </button>
      <button
        data-testid="tab-business"
        onClick={(event) => onTabChange(event, 1)}
        aria-selected={activeTab === 1}
      >
        Business
      </button>
      <button
        data-testid="tab-about"
        onClick={(event) => onTabChange(event, 2)}
        aria-selected={activeTab === 2}
      >
        About
      </button>
    </div>
  ),
  WelcomeNavbar: ({ activePanel }: { activePanel: number }) => (
    <div data-testid="welcome-nav">Nav {activePanel}</div>
  ),
}));

jest.mock('pages/UnderDevPage/UnderDevPage', () => ({
  UnderDevPage: () => (
    <div data-testid="under-dev-page">Page Under Development</div>
  ),
}));

const renderPage = () => {
  return render(
    <BrowserRouter>
      <WelcomeLayout />
    </BrowserRouter>,
  );
};

describe('WelcomeLayout', () => {
  describe('Rendering', () => {
    it('renders all essential components', () => {
      renderPage();

      expect(screen.getByTestId('welcome-header')).toBeInTheDocument();
      expect(screen.getByTestId('logo')).toBeInTheDocument();
      expect(screen.getByTestId('welcome-nav')).toBeInTheDocument();
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('defaults to Personal tab when no URL parameter is provided', () => {
      renderPage();

      const personalTab = screen.getByTestId('tab-personal');
      expect(personalTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByTestId('tab-panel-0')).toBeInTheDocument();
    });
  });

  describe('Tab Navigation', () => {
    it('switches to Business tab when clicked', () => {
      renderPage();

      const businessTab = screen.getByTestId('tab-business');
      fireEvent.click(businessTab);

      expect(businessTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByTestId('tab-panel-1')).toBeInTheDocument();
      expect(screen.queryByTestId('tab-panel-0')).not.toBeInTheDocument();
    });

    it('switches to About tab when clicked', () => {
      renderPage();

      const aboutTab = screen.getByTestId('tab-about');
      fireEvent.click(aboutTab);

      expect(aboutTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByTestId('tab-panel-2')).toBeInTheDocument();
    });

    it('displays correct content for each tab', () => {
      renderPage();

      expect(screen.getByTestId('under-dev-page')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('tab-business'));
      expect(screen.getByTestId('under-dev-page')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('tab-about'));
      expect(screen.getByTestId('under-dev-page')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('passes correct props to child components', () => {
      renderPage();

      expect(screen.getByTestId('logo')).toHaveTextContent('Logo md');

      expect(screen.getByTestId('welcome-nav')).toHaveTextContent('Nav 2');

      fireEvent.click(screen.getByTestId('tab-business'));
      expect(screen.getByTestId('welcome-nav')).toHaveTextContent('Nav 1');
    });
  });
});
