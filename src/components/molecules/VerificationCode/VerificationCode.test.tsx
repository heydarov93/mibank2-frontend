import { render, screen } from '@testing-library/react';

import { VerificationCode } from './VerificationCode';

import { useOtp } from 'hooks';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (str: string) => str,
  }),
}));

jest.mock('hooks');
const useOtpMock = useOtp as jest.Mock;

describe('VerificationCode Component', () => {
  const mockFocusInput = jest.fn();
  const mockSetOtp = jest.fn();
  const mockResetField = jest.fn();
  const mockOnReady = jest.fn();
  const mockInputRefs = {
    current: Array(6).fill(null) as HTMLInputElement[],
  };

  const emptyOtp = ['', '', '', '', '', ''];
  const filledOtp = ['1', '2', '3', '4', '5', '6'];

  const defaultProps = {
    separator: '-',
    length: 6,
    isCodeCorrect: false,
    isFormDisabled: false,
    isCodeWrong: false,
    onResetCodeWrong: jest.fn(),
    onReady: mockOnReady,
    shouldClearFields: false,
  };

  const setup = (props = {}) => {
    return render(<VerificationCode {...defaultProps} {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();

    useOtpMock.mockReturnValue({
      otp: emptyOtp,
      setOtp: mockSetOtp,
      inputRefs: mockInputRefs,
      focusInput: mockFocusInput,
      resetField: mockResetField,
    });
  });

  it('renders correctly with the given props', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it('renders the correct number of input fields and separator', () => {
    setup();
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(defaultProps.length);
    expect(screen.getByText(defaultProps.separator)).toBeInTheDocument();
  });

  it('resets fields when shouldClearFields is true', () => {
    useOtpMock.mockReturnValue({
      otp: filledOtp,
      inputRefs: mockInputRefs,
      resetField: mockResetField,
      focusInput: mockFocusInput,
    });

    setup({ shouldClearFields: true });

    expect(mockResetField).toHaveBeenCalledTimes(1);
  });

  it('calls onReady when all inputs are filled', () => {
    useOtpMock.mockReturnValue({
      otp: filledOtp,
      inputRefs: mockInputRefs,
      focusInput: mockFocusInput,
    });

    setup();

    expect(mockOnReady).toHaveBeenCalledWith(filledOtp.join(''));
  });

  it('disables input fields when isFormDisabled is true', () => {
    setup({ isFormDisabled: true });

    screen.getAllByRole('textbox').forEach((input) => {
      expect(input).toBeDisabled();
    });
  });
});
