import { TextFieldProps } from '@mui/material';
import { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { PatternFormatProps } from 'react-number-format';

import { InputFieldControlled } from '../InputFieldControlled/InputFieldControlled';
import { PatternInput } from '../PatternInput/PatternInput';

import { getFieldErrorMessage } from 'utils/helpers';



interface PatternFieldProps<T extends FieldValues> extends PatternFormatProps {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  textFieldProps?: TextFieldProps;
}

export function PatternFieldControlled<T extends FieldValues>({
  name,
  label,
  control,
  error,
  placeholder,
  disabled,
  textFieldProps,
  ...patternFormatProps
}: PatternFieldProps<T>) {
  return (
    <InputFieldControlled
      name={name}
      control={control}
      textFieldProps={{
        ...textFieldProps,
        label,
        error: !!error,
        helperText: getFieldErrorMessage(error),
        placeholder: placeholder,
        InputProps: {
          ...textFieldProps?.InputProps,
          inputComponent: PatternInput as never,
        },
        disabled: disabled,
        inputProps: patternFormatProps as never,
      }}
    />
  );
}
