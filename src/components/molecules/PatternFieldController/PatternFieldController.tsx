import { TextFieldProps } from '@mui/material';
import { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { PatternFormatProps } from 'react-number-format';

import { InputFieldController } from '../InputFieldController/InputFieldController';
import { PatternInput } from '../PatternInput/PatternInput';

import { getFieldErrorMessage } from 'utils/helpers';

interface PatternFieldControllerProps<T extends FieldValues> extends PatternFormatProps {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  textFieldProps?: TextFieldProps;
}

export function PatternFieldController<T extends FieldValues>({
  name,
  label,
  control,
  error,
  placeholder,
  disabled,
  textFieldProps,
  ...patternFormatProps
}: PatternFieldControllerProps<T>) {
  return (
    <InputFieldController
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
