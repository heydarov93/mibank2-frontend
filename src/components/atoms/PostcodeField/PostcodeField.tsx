import { FieldValues } from 'react-hook-form';

import { InputField, InputFieldProps } from '../InputField/InputField';

import { REG_EXP } from 'validation/regExp';

const MAX_VERIFICATION_CODE_LENGTH = 6;

export const PostcodeField = <T extends FieldValues>(
  props: InputFieldProps<T>,
) => {
  function postcodeInputMask(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    const formatted = target.value
      .replace(/\D/g, '')
      .replace(REG_EXP.postcodeMask, '$1-$2');
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
