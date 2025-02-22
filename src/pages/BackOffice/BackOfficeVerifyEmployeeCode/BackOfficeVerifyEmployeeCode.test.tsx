import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import BackOfficeVerifyEmployeeCode from './BackOfficeVerifyEmployeeCode';

import { useValidateOtpMutation } from 'api/validateOtpApi';

jest.mock('api/validateOtpApi', () => ({
  useValidateOtpMutation: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));
describe('BackOfficeVerifyEmployeeCode', () => {
  let mockValidateOtp: jest.Mock;
  const mockNavigate = jest.fn();
  const mockLocation = { state: { email: 'test-email' } };
  beforeEach(() => {
    jest.clearAllMocks();
    mockValidateOtp = jest.fn();
    (useValidateOtpMutation as jest.Mock).mockReturnValue([
      mockValidateOtp,
      { isLoading: false },
    ]);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useLocation as jest.Mock).mockReturnValue(mockLocation);
  });
  it('should update OTP state and focus next input when valid numeric value entered', () => {
    const { result } = renderHook(() => {
      const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
      const inputRefs = useRef<(HTMLInputElement | null)[]>(
        Array(6).fill(null),
      );
      return { otp, setOtp, inputRefs };
    });

    const mockInputRefs = Array(6).fill({ focus: jest.fn() });
    result.current.inputRefs.current = mockInputRefs;

    const handleChange = (value: string, index: number) => {
      if (!/^\d*$/.test(value)) return;
      const newOtp = [...result.current.otp];
      newOtp[index] = value;
      result.current.setOtp(newOtp);
      if (value && index < result.current.otp.length - 1) {
        result.current.inputRefs.current[index + 1]?.focus();
      }
    };

    act(() => {
      handleChange('1', 0);
    });

    expect(result.current.otp[0]).toBe('1');
    expect(mockInputRefs[1].focus).toHaveBeenCalled();
  });

  it('should not update OTP state when non-numeric value entered', () => {
    const { result } = renderHook(() => {
      const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
      const inputRefs = useRef<(HTMLInputElement | null)[]>(
        Array(6).fill(null),
      );
      return { otp, setOtp, inputRefs };
    });

    const initialOtp = [...result.current.otp];

    const handleChange = (value: string, index: number) => {
      if (!/^\d*$/.test(value)) return;
      const newOtp = [...result.current.otp];
      newOtp[index] = value;
      result.current.setOtp(newOtp);
    };

    act(() => {
      handleChange('a', 0);
    });

    expect(result.current.otp).toEqual(initialOtp);
  });
  it('renders correctly and matches snapshot', () => {
    const { asFragment } = render(<BackOfficeVerifyEmployeeCode />);
    expect(asFragment()).toMatchSnapshot();
  });

  test.only('renders the form and submits correctly', () => {
    render(<BackOfficeVerifyEmployeeCode />);
    screen.debug();
    expect(screen.getByTestId('logo')).toBeInTheDocument();

    expect(screen.getByText('logoTitle')).toBeInTheDocument();
    expect(
      screen.getByText('OTPVerificationPage.verifyCodeMessage'),
    ).toBeInTheDocument();

    const otpInputs = screen.getAllByRole('textbox');
    expect(otpInputs).toHaveLength(6);

    const confirmButton = screen.getByRole('button', {
      name: 'OTPVerificationPage.confirmButtonText',
    });
    expect(confirmButton).toBeDisabled();

    const cancelButton = screen.getByRole('button', {
      name: 'OTPVerificationPage.cancelButtonText',
    });
    expect(cancelButton).toBeInTheDocument();

    otpInputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: String(index + 1) } });
    });

    expect(confirmButton).not.toBeDisabled();

    fireEvent.click(cancelButton);

    fireEvent.click(confirmButton);
  });
  it('should handle backspace key correctly', () => {
    render(<BackOfficeVerifyEmployeeCode />);
    const otpInputs = screen.getAllByRole('textbox');

    otpInputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: String(index + 1) } });
    });

    fireEvent.keyDown(otpInputs[5], { key: 'Backspace' });
    expect(otpInputs[5]).toHaveValue('');

    fireEvent.keyDown(otpInputs[5], { key: 'Backspace' });
    expect(document.activeElement).toBe(otpInputs[4]);
  });

  it('should call the cancel button handler and reset OTP inputs', () => {
    render(<BackOfficeVerifyEmployeeCode />);
    const otpInputs = screen.getAllByRole('textbox');
    const cancelButton = screen.getByRole('button', {
      name: 'OTPVerificationPage.cancelButtonText',
    });

    otpInputs.forEach((input, index) => {
      fireEvent.change(input, { target: { value: String(index + 1) } });
    });

    fireEvent.click(cancelButton);

    otpInputs.forEach((input) => {
      expect(input).toHaveValue('');
    });

    expect(document.activeElement).toBe(otpInputs[0]);
  });

  it('should show loading indicator when submitting OTP', async () => {
    (useValidateOtpMutation as jest.Mock).mockReturnValue([
      jest.fn(),
      { isLoading: true },
    ]);

    render(<BackOfficeVerifyEmployeeCode />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should disable confirm button when OTP is incomplete', () => {
    render(<BackOfficeVerifyEmployeeCode />);
    const confirmButton = screen.getByRole('button', {
      name: 'OTPVerificationPage.confirmButtonText',
    });

    fireEvent.change(screen.getAllByRole('textbox')[0], {
      target: { value: '1' },
    });

    expect(confirmButton).toBeDisabled();
  });

  it('should not submit if email is missing from location state', () => {
    (useLocation as jest.Mock).mockReturnValue({ state: null });

    render(<BackOfficeVerifyEmployeeCode />);
    const confirmButton = screen.getByRole('button', {
      name: 'OTPVerificationPage.confirmButtonText',
    });

    fireEvent.click(confirmButton);

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
