import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { NavMenu } from './NavMenu';

import { MAIN_NAV_LINKS } from 'constants/navigation/navigation';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: () => {},
  },
}));

describe('NavMenu', () => {
  it('renders navigation menu links', () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <NavMenu />
      </MemoryRouter>,
    );

    const navMenu = getByTestId('nav-menu');
    expect(navMenu).toBeInTheDocument();

    MAIN_NAV_LINKS.forEach(({ label }) => {
      const translatedContent = label;
      const linkElement = getByText(translatedContent);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
