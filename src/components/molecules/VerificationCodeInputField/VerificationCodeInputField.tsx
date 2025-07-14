import { KeyboardEvent, SyntheticEvent } from 'react';
import { Control, FieldErrors, FieldValues, Path } from 'react-hook-form';

import { InputField } from 'components/atoms';
import { OTP_INPUT_KEY } from 'constants/validation/otp';
import { IForgotPasswordFormInput } from 'models/IAuth';

interface VerificationCodeInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  errors: FieldErrors<IForgotPasswordFormInput>;
  isFormDisabled?: boolean;
  onFocus?: () => void;
  onPaste: (e: SyntheticEvent) => void;
}

export const VerificationCodeInputField = <T extends FieldValues>({
  control,
  name,
  errors,
  isFormDisabled,
  onFocus,
  onPaste,
}: VerificationCodeInputFieldProps<T>) => {
  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === OTP_INPUT_KEY.Space) {
      event.preventDefault();
    }
  };

  return (
    <InputField
      name={name}
      control={control}
      id="verificationCode"
      error={errors.verificationCode}
      type="string"
      placeholder="᛫᛫᛫᛫᛫᛫"
      disabled={isFormDisabled}
      onFocus={onFocus}
      onKeyDown={onKeyDownHandler}
      onPaste={onPaste}
    />
  );
};
