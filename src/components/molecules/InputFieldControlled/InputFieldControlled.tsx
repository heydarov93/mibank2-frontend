import { TextField, TextFieldProps } from '@mui/material';
import { Controller, Path, FieldValues, Control } from 'react-hook-form';

interface InputFieldControlledProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  textFieldProps?: TextFieldProps;
}

export function InputFieldControlled<T extends FieldValues>({
  name,
  control,
  textFieldProps,
}: InputFieldControlledProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, ...field } }) => {
        return (
          <TextField
            id={name}
            fullWidth
            {...field}
            onChange={({ target: { value } }) => {
              onChange(value);
            }}
            value={field.value ? field.value : ''}
            {...textFieldProps}
            InputProps={{
              ...textFieldProps?.InputProps,
              sx: { borderRadius: '8px', ...textFieldProps?.InputProps?.sx },
            }}
            inputProps={{
              ...textFieldProps?.inputProps,
            }}
          />
        );
      }}
    />
  );
}
