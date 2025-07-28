import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ConfirmationWindow } from './ConfirmationWindow';

const mockOnClose = jest.fn();

jest.mock(
  'components/atoms/SuccessfulCreationIcon/SuccessfulCreationIcon',
  () => ({
    SuccessfulCreationIcon: () => <div data-testid="success-icon"></div>,
  }),
);

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

describe('ConfirmationWindow', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <ConfirmationWindow onClose={mockOnClose} />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders successfully with correct content', () => {
    render(
      <MemoryRouter>
        <ConfirmationWindow onClose={mockOnClose} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('success-icon')).toBeInTheDocument();
    expect(screen.getByTestId('confirmation-title')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-text')).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });
});
