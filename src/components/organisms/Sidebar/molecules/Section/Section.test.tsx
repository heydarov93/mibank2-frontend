import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Section } from './Section';

import { TO_HISTORY } from 'constants/navigation/routePaths';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Section', () => {
  it('renders title and seeAll link', () => {
    render(
      <MemoryRouter>
        <Section title="My Transactions" seeAllRoute={TO_HISTORY}>
          <div data-testid="child-content">Child content</div>
        </Section>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('section-title')).toHaveTextContent(
      'My Transactions',
    );
    expect(screen.getByRole('link', { name: 'seeAll' })).toHaveAttribute(
      'href',
      TO_HISTORY,
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('does not render Add button if onAddProduct not provided', () => {
    render(
      <MemoryRouter>
        <Section title="My Transactions" seeAllRoute={TO_HISTORY} />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId('add-product-button')).not.toBeInTheDocument();
  });

  it('calls onAddProduct when Add button is clicked', () => {
    const onAddProduct = jest.fn();

    render(
      <MemoryRouter>
        <Section
          title="My Transactions"
          seeAllRoute={TO_HISTORY}
          onAddProduct={onAddProduct}
        />
      </MemoryRouter>,
    );

    const addButton = screen.getByTestId('add-product-button');
    fireEvent.click(addButton);

    expect(onAddProduct).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <Section title="My Transactions" seeAllRoute={TO_HISTORY} />
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
