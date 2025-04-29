import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { WelcomeNav } from './WelcomeNav';

import { navMenuLinks } from 'constants/welcomeNavigation';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

describe('WelcomeNav', () => {
  it('renders welcome navigation menu links', () => {
    render(
      <MemoryRouter>
        <WelcomeNav activePanel={0} />
      </MemoryRouter>,
    );

    const navMenu = screen.getByRole('navigation');
    expect(navMenu).toBeInTheDocument();

    navMenuLinks.forEach(({ content }) => {
      const linkElement = screen.getByText(content);
      expect(linkElement).toBeInTheDocument();
    });
  });
});

test('matches snapshot', () => {
  const { asFragment } = render(
    <MemoryRouter>
      <WelcomeNav activePanel={0} />
    </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
