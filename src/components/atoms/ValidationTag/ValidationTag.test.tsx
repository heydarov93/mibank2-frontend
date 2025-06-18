import { render, screen } from '@testing-library/react';

import { ValidationTag } from './ValidationTag';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

describe('ValidationTag', () => {
  it('should render correctly', () => {
    const { container } = render(<ValidationTag text="" isValidated />);
    expect(container).toBeInTheDocument();
  });

  it('displays the correct text', () => {
    render(<ValidationTag text="Minimum 8 characters" isValidated />);
    expect(screen.getByText('Minimum 8 characters')).toBeInTheDocument();
  });

  it('renders CheckIcon when isValidated is true', () => {
    render(<ValidationTag text="" isValidated />);
    expect(screen.getByTestId('success-icon')).toBeInTheDocument();
  });

  it('renders ClearIcon when isValidated is false', () => {
    render(<ValidationTag text="" isValidated={false} />);
    expect(screen.getByTestId('error-icon')).toBeInTheDocument();
  });

  it('renders info icon when withInfo is true', () => {
    render(<ValidationTag text="" isValidated withInfo />);
    const infoIcon = screen.getByTestId('info-icon');
    expect(infoIcon).toBeInTheDocument();
  });

  it('to match snapshot', () => {
    const { asFragment } = render(
      <ValidationTag text="" isValidated withInfo />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
