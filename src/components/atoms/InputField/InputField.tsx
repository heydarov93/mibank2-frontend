import { SyntheticEvent, KeyboardEvent, ReactNode } from 'react';
import {
  Controller,
  Control,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';

import { StyledTextField } from './InputField.styled';

const enum FieldName {
  email = 'email',
  password = 'password',
  confirmPassword = 'confirmPassword',
}

interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  id: `${FieldName}`;
  control: Control<T>;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  error?: FieldError;
  helperText?: string | ReactNode;
  className?: string;
  InputProps?: {
    endAdornment: JSX.Element;
  };
  onCut?: (e: SyntheticEvent) => void;
  onCopy?: (e: SyntheticEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: SyntheticEvent) => void;
}

export const InputField = <T extends FieldValues>({
  name,
  id,
  control,
  placeholder,
  type = 'text',
  disabled = false,
  error,
  helperText,
  className,
  onCut,
  onCopy,
  onKeyUp,
  onFocus,
  InputProps,
}: InputFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <StyledTextField
        fullWidth
        id={id}
        helperText={helperText || error?.message}
        className={className}
        error={!!error}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onCut={onCut}
        onCopy={onCopy}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        InputProps={InputProps}
        {...field}
      />
    )}
  />
);
