import { TextFieldProps } from '@mui/material/TextField';
import { Control, FieldError, FieldValues, Path } from 'react-hook-form';
import { NumericFormatProps } from 'react-number-format';

import { InputFieldController } from '../InputFieldController/InputFieldController';
import { NumericInput } from '../NumericInput/NumericInput';

import { getFieldErrorMessage } from 'utils/helpers';

interface NumericFieldControllerProps<T extends FieldValues> extends NumericFormatProps {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  textFieldProps?: TextFieldProps;
}

export function NumericFieldController<T extends FieldValues>({
  name,
  label,
  control,
  error,
  placeholder,
  disabled,
  textFieldProps,
  ...numericFormatProps
}: NumericFieldControllerProps<T>) {
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
          inputComponent: NumericInput as never,
        },
        disabled: disabled,
        inputProps: numericFormatProps as never,
      }}
    />
  );
}
