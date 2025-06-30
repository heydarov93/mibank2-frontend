import { fireEvent, render, screen } from '@testing-library/react';

import { RegistrationFormWrapper } from './RegistrationFormWrapper';

import { EStepper } from 'enums/EStepper';

// Mock the hook
const mockUseRegFormFlow = jest.fn();
jest.mock('hooks/useRegFormFlow', () => ({
  useRegFormFlow: () => mockUseRegFormFlow(),
}));

jest.mock('../RegistrationForm/PersonalInfo/PersonalInfo', () => ({
  PersonalInfo: () => (
    <div data-testid="personal-info-form">Personal Info Form</div>
  ),
}));

jest.mock('../RegistrationForm/LegalStatus/LegalStatus', () => ({
  LegalStatus: ({ onBack }: { onBack: () => void }) => (
    <div data-testid="legal-status-form">
      Legal Status Form
      <button onClick={onBack} data-testid="legal-status-back">
        Back
      </button>
    </div>
  ),
}));

jest.mock(
  '../RegistrationForm/DocumentInfoWrapper/DocumentInfoWrapper',
  () => ({
    DocumentInfoWrapper: ({ onBack }: { onBack: () => void }) => (
      <div data-testid="document-info-form">
        Document Info Form
        <button onClick={onBack} data-testid="document-info-back">
          Back
        </button>
      </div>
    ),
  }),
);

jest.mock('../RegistrationForm/Address/Address', () => ({
  Address: ({ onBack }: { onBack: () => void }) => (
    <div data-testid="address-form">
      Address Form
      <button onClick={onBack} data-testid="address-back">
        Back
      </button>
    </div>
  ),
}));

jest.mock('../MiBankStepper/MiBankStepper', () => ({
  MiBankStepper: ({ step }: { step: string }) => (
    <div data-testid="stepper">Step: {step}</div>
  ),
}));

jest.mock('components/atoms', () => ({
  BackArrow: ({ onBackClick }: { onBackClick: () => void }) => (
    <button onClick={onBackClick} data-testid="back-arrow">
      Back Arrow
    </button>
  ),
  NavigationWarningModal: ({
    open,
    onConfirm,
    onCancel,
  }: {
    open: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  }) =>
    open ? (
      <div data-testid="warning-modal">
        <p>Navigation Warning</p>
        <button onClick={onConfirm} data-testid="modal-confirm">
          Confirm
        </button>
        <button onClick={onCancel} data-testid="modal-cancel">
          Cancel
        </button>
      </div>
    ) : null,
}));

jest.mock('react-hook-form', () => ({
  FormProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="form-provider">{children}</div>
  ),
}));

const mockFormMethods = {
  handleSubmit: jest.fn(),
  formState: { errors: {} },
  register: jest.fn(),
  watch: jest.fn(),
  setValue: jest.fn(),
};

const defaultMockReturn = {
  step: EStepper.PERSONAL_INFO,
  leaveModal: {
    isOpen: false,
    open: jest.fn(),
    close: jest.fn(),
  },
  submitForm: jest.fn(),
  handleConfirm: jest.fn(),
  handleBack: jest.fn(),
  formMethods: mockFormMethods,
};

describe('RegistrationFormWrapper', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRegFormFlow.mockReturnValue(defaultMockReturn);
  });

  describe('Component structure', () => {
    it('renders main components', () => {
      render(<RegistrationFormWrapper />);

      expect(screen.getByTestId('back-arrow')).toBeInTheDocument();
      expect(screen.getByTestId('stepper')).toBeInTheDocument();
      expect(screen.getByTestId('form-provider')).toBeInTheDocument();
      expect(screen.getByTestId('registration-form')).toBeInTheDocument();
    });

    it('renders stepper with current step', () => {
      mockUseRegFormFlow.mockReturnValue({
        ...defaultMockReturn,
        step: EStepper.LEGAL_STATUS,
      });

      render(<RegistrationFormWrapper />);

      expect(screen.getByTestId('stepper')).toHaveTextContent(
        'Step: 1',
      );
    });
  });

  describe('Step rendering', () => {
    it('renders PersonalInfo form for PERSONAL_INFO step', () => {
      mockUseRegFormFlow.mockReturnValue({
        ...defaultMockReturn,
        step: EStepper.PERSONAL_INFO,
      });

      render(<RegistrationFormWrapper />);

      expect(screen.getByTestId('personal-info-form')).toBeInTheDocument();
    });

    it('renders LegalStatus form for LEGAL_STATUS step', () => {
      mockUseRegFormFlow.mockReturnValue({
        ...defaultMockReturn,
        step: EStepper.LEGAL_STATUS,
      });

      render(<RegistrationFormWrapper />);

      expect(screen.getByTestId('legal-status-form')).toBeInTheDocument();
    });

    it('renders DocumentInfoWrapper form for DOCUMENT_INFO step', () => {
      mockUseRegFormFlow.mockReturnValue({
        ...defaultMockReturn,
        step: EStepper.DOCUMENT_INFO,
      });

      render(<RegistrationFormWrapper />);

      expect(screen.getByTestId('document-info-form')).toBeInTheDocument();
    });

    it('renders Address form for ADDRESS step', () => {
      mockUseRegFormFlow.mockReturnValue({
        ...defaultMockReturn,
        step: EStepper.ADDRESS,
      });

      render(<RegistrationFormWrapper />);

      expect(screen.getByTestId('address-form')).toBeInTheDocument();
    });

    it('renders PersonalInfo form for unknown step', () => {
      mockUseRegFormFlow.mockReturnValue({
        ...defaultMockReturn,
        step: 'UNKNOWN_STEP' as any,
      });

      render(<RegistrationFormWrapper />);

      expect(screen.getByTestId('personal-info-form')).toBeInTheDocument();
    });
  });

  describe('Navigation interactions', () => {
    it('opens warning modal when back arrow is clicked', () => {
      const mockOpen = jest.fn();
      mockUseRegFormFlow.mockReturnValue({
        ...defaultMockReturn,
        leaveModal: {
          ...defaultMockReturn.leaveModal,
          open: mockOpen,
        },
      });

      render(<RegistrationFormWrapper />);

      fireEvent.click(screen.getByTestId('back-arrow'));

      expect(mockOpen).toHaveBeenCalledTimes(1);
    });

    it('calls handleBack when step form back button is clicked', () => {
      const mockHandleBack = jest.fn();
      mockUseRegFormFlow.mockReturnValue({
        ...defaultMockReturn,
        step: EStepper.LEGAL_STATUS,
        handleBack: mockHandleBack,
      });

      render(<RegistrationFormWrapper />);

      fireEvent.click(screen.getByTestId('legal-status-back'));

      expect(mockHandleBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('Warning modal', () => {
    it('does not show modal by default', () => {
      render(<RegistrationFormWrapper />);

      expect(screen.queryByTestId('warning-modal')).not.toBeInTheDocument();
    });

    it('shows warning modal when open', () => {
      mockUseRegFormFlow.mockReturnValue({
        ...defaultMockReturn,
        leaveModal: {
          ...defaultMockReturn.leaveModal,
          isOpen: true,
        },
      });

      render(<RegistrationFormWrapper />);

      expect(screen.getByTestId('warning-modal')).toBeInTheDocument();
    });

    it('calls handleConfirm when modal confirm is clicked', () => {
      const mockHandleConfirm = jest.fn();
      mockUseRegFormFlow.mockReturnValue({
        ...defaultMockReturn,
        leaveModal: {
          ...defaultMockReturn.leaveModal,
          isOpen: true,
        },
        handleConfirm: mockHandleConfirm,
      });

      render(<RegistrationFormWrapper />);

      fireEvent.click(screen.getByTestId('modal-confirm'));

      expect(mockHandleConfirm).toHaveBeenCalledTimes(1);
    });

    it('calls leaveModal.close when modal cancel is clicked', () => {
      const mockClose = jest.fn();
      mockUseRegFormFlow.mockReturnValue({
        ...defaultMockReturn,
        leaveModal: {
          ...defaultMockReturn.leaveModal,
          isOpen: true,
          close: mockClose,
        },
      });

      render(<RegistrationFormWrapper />);

      fireEvent.click(screen.getByTestId('modal-cancel'));

      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Form submission', () => {
    it('calls submitForm when form is submitted', () => {
      const mockSubmitForm = jest.fn((e) => e.preventDefault());
      mockUseRegFormFlow.mockReturnValue({
        ...defaultMockReturn,
        submitForm: mockSubmitForm,
      });

      render(<RegistrationFormWrapper />);

      fireEvent.submit(screen.getByTestId('registration-form'));

      expect(mockSubmitForm).toHaveBeenCalledTimes(1);
    });
  });
});
