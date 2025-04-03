import { render, screen } from '@testing-library/react';

import BackOfficeConfirmationWindow from './BackOfficeConfirmationWindow';

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
      <BackOfficeConfirmationWindow onClose={jest.fn()} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders successfully with correct content', () => {
    render(<BackOfficeConfirmationWindow onClose={jest.fn()} />);

    expect(screen.getByTestId('success-icon')).toBeInTheDocument();
    expect(screen.getByTestId('confirmation-title')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-text')).toBeInTheDocument();
    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });
});
