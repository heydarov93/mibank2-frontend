import { SyntheticEvent } from 'react';
import { FieldValues } from 'react-hook-form';

import { InputField, InputFieldProps } from '../InputField/InputField';

import {
  VALIDATION_LIMITS,
  VALIDATION_PATTERNS,
} from 'constants/validation/patterns';

export const PostcodeField = <T extends FieldValues>(
  props: InputFieldProps<T>,
) => {
  function postcodeInputMask(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    const formatted = target.value
      .replace(/\D/g, '')
      .replace(VALIDATION_PATTERNS.POSTCODE_MASK, '$1-$2');
    target.value = formatted;
  }

  const handleChange = (e: SyntheticEvent) => {
    props.onChange?.(e);
    postcodeInputMask(e);
  };

  return (
    <InputField
      maxLength={VALIDATION_LIMITS.VERIFICATION_CODE_LENGTH}
      onChange={handleChange}
      {...props}
    />
  );
};
