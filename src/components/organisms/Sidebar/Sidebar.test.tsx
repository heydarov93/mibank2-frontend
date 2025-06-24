import { ThemeProvider } from '@mui/material';
import { render, screen, fireEvent } from '@testing-library/react';

import { Sidebar } from './Sidebar';

import { theme } from 'theme/theme';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('utils/dateUtils', () => ({
  getLocaleDateString: () => 'MOCKED_DATE',
  getLocaleTimeString: () => 'MOCKED_TIME',
}));

jest.mock('./molecules/Section/Section', () => ({
  Section: ({ title, onAddProduct, children }: any) => (
    <div>
      <div data-testid="section-title">{title}</div>
      {onAddProduct && (
        <button
          onClick={onAddProduct}
          data-testid={`add-product-button-${title.split(' ').join('')}`}
        >
          Add
        </button>
      )}
      {children}
    </div>
  ),
}));

describe('Sidebar', () => {
  it('renders all sections and Add New Product button', () => {
    render(
      <ThemeProvider theme={theme}>
        <Sidebar
          onIssueCardModalOpen={jest.fn()}
          onDepositsModalOpen={jest.fn()}
        />
      </ThemeProvider>,
    );

    const sectionTitles = screen
      .getAllByTestId('section-title')
      .map((el) => el.textContent);

    expect(sectionTitles).toContain('myCards.title');
    expect(sectionTitles).toContain('myTransactions.title');
    expect(sectionTitles).toContain('myLoans.title');
    expect(sectionTitles).toContain('myDeposits.title');

    expect(screen.getByTestId('my-transactions')).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'addNewProduct' }),
    ).toBeInTheDocument();
  });

  it('calls onIssueCardModalOpen when Add MyCards clicked', () => {
    const onIssueCardModalOpen = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <Sidebar
          onIssueCardModalOpen={onIssueCardModalOpen}
          onDepositsModalOpen={jest.fn()}
        />
      </ThemeProvider>,
    );

    const addMyCardsButton = screen.getByTestId(
      'add-product-button-myCards.title',
    );
    fireEvent.click(addMyCardsButton);

    expect(onIssueCardModalOpen).toHaveBeenCalled();
  });

  it('calls onDepositsModalOpen when Add MyDeposits clicked', () => {
    const onDepositsModalOpen = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <Sidebar
          onIssueCardModalOpen={jest.fn()}
          onDepositsModalOpen={onDepositsModalOpen}
        />
      </ThemeProvider>,
    );

    const addMyDepositsButton = screen.getByTestId(
      'add-product-button-myDeposits.title',
    );
    fireEvent.click(addMyDepositsButton);

    expect(onDepositsModalOpen).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider theme={theme}>
        <Sidebar
          onIssueCardModalOpen={jest.fn()}
          onDepositsModalOpen={jest.fn()}
        />
      </ThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
