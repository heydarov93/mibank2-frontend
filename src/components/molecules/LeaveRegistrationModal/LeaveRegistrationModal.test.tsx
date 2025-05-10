import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LeaveRegistrationModal } from './LeaveRegistrationModal';

import { TO_WELCOME } from 'constants/routesName';

const mockNavigate = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'leaveRegisterModal.title': 'Leaving registration?',
        'leaveRegisterModal.body': 'The progress won’t be saved.',
        'leaveRegisterModal.cancelBtn': 'Cancel',
        'leaveRegisterModal.confirmBtn': 'Confirm',
      };
      return translations[key] ?? key;
    },
  }),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('LeaveRegistrationModal', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    render(<LeaveRegistrationModal open={true} onCloseModal={onClose} />);
    jest.clearAllMocks();
  });

  it('renders nothing when open is false', () => {
    const { container } = render(
      <LeaveRegistrationModal open={false} onCloseModal={onClose} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title, body, and buttons when open is true', () => {
    expect(screen.getByText(/leaving registration\?/i)).toBeInTheDocument();

    expect(
      screen.getByText(/the progress won’t be saved\./i),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /confirm/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('close-button')).toBeInTheDocument();
  });

  it('calls onCloseModal when clicking Cancel button', async () => {
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelBtn);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onCloseModal when clicking Close icon', async () => {
    const closeX = screen.getByTestId('close-button');
    await userEvent.click(closeX);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('navigates to welcome route when clicking Confirm button', async () => {
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });
    await userEvent.click(confirmBtn);
    expect(mockNavigate).toHaveBeenCalledWith(TO_WELCOME);
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(
      <LeaveRegistrationModal open={true} onCloseModal={onClose} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
