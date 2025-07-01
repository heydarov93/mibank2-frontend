import { TextField, TextFieldProps } from '@mui/material';
import { Controller, Path, FieldValues, Control } from 'react-hook-form';

import { FieldLabel } from 'components/atoms';

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
  const { label, disabled, ...restTextFieldProps } = textFieldProps ?? {};
  return (
    <>
      {label && (
        <FieldLabel disabled={disabled} htmlFor={name}>
          {label}
        </FieldLabel>
      )}
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
              {...restTextFieldProps}
              disabled={disabled}
              InputProps={{
                ...restTextFieldProps?.InputProps,
                sx: {
                  borderRadius: '8px',
                  ...restTextFieldProps?.InputProps?.sx,
                },
              }}
              inputProps={{
                ...restTextFieldProps?.inputProps,
              }}
            />
          );
        }}
      />
    </>
  );
}
