import { SyntheticEvent, KeyboardEvent } from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';

import { StyledTextField } from './InputField.styled';

import { IFormInput } from 'models/IAuth';

interface InputFieldProps {
  name: 'email' | 'password';
  control: Control<IFormInput>;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  error?: FieldError;
  helperText?: string;
  className?: string;
  InputProps?: {
    endAdornment: JSX.Element;
  };
  onCut?: (e: SyntheticEvent) => void;
  onCopy?: (e: SyntheticEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const InputField = ({
  name,
  control,
  placeholder,
  type = 'text',
  disabled = false,
  error,
  helperText,
  className,
  onCut,
  onCopy,
  InputProps,
}: InputFieldProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <StyledTextField
        fullWidth
        id={name}
        helperText={helperText || error?.message}
        className={className}
        error={!!error}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onCut={onCut}
        onCopy={onCopy}
        InputProps={InputProps}
        {...field}
      />
    )}
  />
);
