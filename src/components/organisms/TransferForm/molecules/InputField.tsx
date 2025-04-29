import { TextField, TextFieldProps } from '@mui/material';
import {
  Controller,
  Path,
  FieldValues,
  Control,
  FieldError,
} from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  textFieldProps?: TextFieldProps;
  inputComponent?: never;
  error?: FieldError | undefined;
}

export function InputField<T extends FieldValues>({
  name,
  control,
  textFieldProps,
  inputComponent,
  error,
}: InputFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...field } }) => (
        <TextField
          id={name}
          fullWidth
          {...field}
          onChange={({ target: { value } }) => {
            onChange(value);
          }}
          value={field.value ? field.value : ''}
          {...textFieldProps}
          error={!!error}
          helperText={error?.message ?? ''}
          InputProps={{
            ...textFieldProps?.InputProps,
            sx: { borderRadius: '8px' },
            inputComponent: inputComponent,
          }}
        />
      )}
    />
  );
}
