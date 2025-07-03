import { FieldValues } from 'react-hook-form';

import { InputField, InputFieldProps } from '../InputField/InputField';

import { VALIDATION_PATTERNS } from 'constants/validationPatternConstants';

const MAX_VERIFICATION_CODE_LENGTH = 6;

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

  function handleChange(e: React.SyntheticEvent) {
    props.onChange?.(e);
    postcodeInputMask(e);
  }

  return (
    <InputField
      maxLength={MAX_VERIFICATION_CODE_LENGTH}
      {...props}
      onChange={handleChange}
    />
  );
};
