import { render, screen } from '@testing-library/react';
import { BackOfficeVerificationPage } from './BackOfficeVerificationPage';

jest.mock('components/organisms/OneTimePasscodeForm', () => ({
  OneTimePasscodeForm: () => <div>One Time Passcode Form</div>,
}));

describe('BackOfficeVerificationPage', () => {
  it('renders Step 1 correctly', () => {
    render(<BackOfficeVerificationPage />);

    const step1Header = screen.getByTestId('step-one');
    const step1Description = screen.getByTestId('qr-code-title');

    expect(step1Header).toBeInTheDocument();
    expect(step1Description).toBeInTheDocument();
  });

  it('renders Step 2 correctly', () => {
    render(<BackOfficeVerificationPage />);

    const step2Header = screen.getByTestId('step-two');
    const step2Description = screen.getByTestId('step-two-text');

    expect(step2Header).toBeInTheDocument();
    expect(step2Description).toBeInTheDocument();

    const formElement = screen.getByText(/One Time Passcode Form/i);
    expect(formElement).toBeInTheDocument();
  });

  it('renders the main layout container', () => {
    render(<BackOfficeVerificationPage />);

    const mainContainer = screen.getByTestId('main-container');
    expect(mainContainer).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<BackOfficeVerificationPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
