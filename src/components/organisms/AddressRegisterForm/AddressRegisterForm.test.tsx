import { ThemeProvider } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AddressRegisterForm } from './AddressRegisterForm';

import { theme } from 'theme/theme';

const mockHandleBackClick = jest.fn();
const mockHandleNavigateBack = jest.fn();
const mockHandleCancelNavigateBack = jest.fn();
const mockUseNavigationWarning = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
  initReactI18next: {
    type: '3rdParty',
  },
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/verify-email' }),
}));

jest.mock('./hooks/useAddressForm', () => ({
  useAddressForm: () => ({
    handleSubmit: (fn: any) => (e: any) => {
      e && e.preventDefault();
      fn && fn();
    },
    onSubmit: jest.fn(),
    isValid: true,
    control: {},
  }),
}));

jest.mock('./molecules', () => ({
  CityField: (props: any) => (
    <input
      aria-label={props.label}
      placeholder={props.placeholder}
      data-testid="city-field"
    />
  ),
  FormField: (props: any) => (
    <input
      aria-label={props.label}
      placeholder={props.placeholder}
      data-testid={`formfield-${props.name}`}
      disabled={props.disabled}
    />
  ),
}));

jest.mock('components/atoms', () => ({
  NavigationWarningModal: (props: any) => {
    const { onConfirm, onCancel, title, description, open } = props;
    return open ? (
      <div data-testid="warning-modal">
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    ) : null;
  },
}));

jest.mock('hooks', () => ({
  useNavigationWarning: (...args: any[]) => mockUseNavigationWarning(...args),
}));

function renderComponent() {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>
        <AddressRegisterForm />
      </MemoryRouter>
    </ThemeProvider>,
  );
}

describe('AddressRegisterForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNavigationWarning.mockReturnValue({
      warningModalOpen: false,
      handleBackClick: mockHandleBackClick,
      handleNavigateBack: mockHandleNavigateBack,
      handleCancelNavigateBack: mockHandleCancelNavigateBack,
    });
  });

  it('renders form component and back button', () => {
    renderComponent();

    expect(screen.getByLabelText('form.fields.country')).toBeInTheDocument();
    expect(screen.getByLabelText('form.fields.city')).toBeInTheDocument();
    expect(screen.getByLabelText('form.fields.street')).toBeInTheDocument();
    expect(screen.getByLabelText('form.fields.building')).toBeInTheDocument();
    expect(screen.getByLabelText('form.fields.office')).toBeInTheDocument();
    expect(screen.getByLabelText('form.fields.postcode')).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText('form.fields.cityPlaceholder'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('form.fields.streetPlaceholder'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('form.fields.buildingPlaceholder'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('form.fields.officePlaceholder'),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('form.fields.postcodePlaceholder'),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'form.submitButton' }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: 'backButton' }),
    ).toBeInTheDocument();
  });

  it('shows the navigation warning modal when warningModalOpen is true', () => {
    mockUseNavigationWarning.mockReturnValue({
      warningModalOpen: true,
      handleBackClick: mockHandleBackClick,
      handleNavigateBack: mockHandleNavigateBack,
      handleCancelNavigateBack: mockHandleCancelNavigateBack,
    });

    renderComponent();

    expect(screen.getByTestId('warning-modal')).toBeInTheDocument();
  });

  it('does not show the navigation warning modal when warningModalOpen is false', () => {
    mockUseNavigationWarning.mockReturnValue({
      warningModalOpen: false,
      handleBackClick: mockHandleBackClick,
      handleNavigateBack: mockHandleNavigateBack,
      handleCancelNavigateBack: mockHandleCancelNavigateBack,
    });

    renderComponent();

    expect(screen.queryByTestId('warning-modal')).not.toBeInTheDocument();
  });

  it('calls handleBackClick when the back button is clicked', () => {
    renderComponent();

    const backButton = screen.getByRole('button', { name: 'backButton' });
    fireEvent.click(backButton);

    expect(mockHandleBackClick).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when confirm button in modal is clicked', () => {
    mockUseNavigationWarning.mockReturnValue({
      warningModalOpen: true,
      handleBackClick: mockHandleBackClick,
      handleNavigateBack: mockHandleNavigateBack,
      handleCancelNavigateBack: mockHandleCancelNavigateBack,
    });

    renderComponent();

    const confirmButton = screen.getByText('warning.confirm');
    fireEvent.click(confirmButton);

    expect(mockHandleNavigateBack).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when cancel button in modal is clicked', () => {
    mockUseNavigationWarning.mockReturnValue({
      warningModalOpen: true,
      handleBackClick: mockHandleBackClick,
      handleNavigateBack: mockHandleNavigateBack,
      handleCancelNavigateBack: mockHandleCancelNavigateBack,
    });

    renderComponent();

    const cancelButton = screen.getByText('warning.cancel');
    fireEvent.click(cancelButton);

    expect(mockHandleCancelNavigateBack).toHaveBeenCalledTimes(1);
  });

  it('matches the snapshot', () => {
    const { asFragment } = renderComponent();
    expect(asFragment()).toMatchSnapshot();
  });
});
