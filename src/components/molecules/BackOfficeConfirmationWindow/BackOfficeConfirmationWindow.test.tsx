import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import BackOfficeConfirmationWindow from './BackOfficeConfirmationWindow';

const mockOnClose = jest.fn();

jest.mock(
  'components/atoms/SuccessfulCreationIcon/SuccessfulCreationIcon',
  () => {
    const MockedComponent = () => <div data-testid="success-icon"></div>;
    MockedComponent.displayName = 'SuccessfulCreationIcon';
    return MockedComponent;
  },
);

describe('BackOfficeConfirmationWindow', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <MemoryRouter>
        <BackOfficeConfirmationWindow onClose={mockOnClose} />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders successfully with correct content', () => {
    render(
      <MemoryRouter>
        <BackOfficeConfirmationWindow onClose={mockOnClose} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('success-icon')).toBeInTheDocument();
    expect(screen.getByTestId('confirmation-title')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-text')).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });
});
