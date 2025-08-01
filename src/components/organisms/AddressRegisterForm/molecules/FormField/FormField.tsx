import FormControl from '@mui/material/FormControl';
import { SxProps, Theme } from '@mui/material/styles';
import { Control, Controller } from 'react-hook-form';

import {
  ErrorMessage,
  StyledFieldLabel,
  StyledTextField,
} from '../../AddressRegisterForm.styled';

import { SelectField } from 'components/molecules';
import { EFieldType } from 'enums';
import { ILegalAddress } from 'models/IRegistration';
import { TBaseSelectOption } from 'types/types';

export interface FormFieldProps {
  name: keyof ILegalAddress;
  label: string;
  control?: Control<ILegalAddress>;
  placeholder?: string;
  type?: 'text' | 'select';
  options?: TBaseSelectOption[];
  disabled?: boolean;
  containerStyle?: SxProps<Theme>;
}

export const FormField = ({
  name,
  control,
  label,
  placeholder,
  type = 'text',
  options = [],
  disabled = false,
  containerStyle,
}: FormFieldProps) => {
  return (
    <FormControl fullWidth sx={containerStyle}>
      <StyledFieldLabel>{label}</StyledFieldLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          if (type === EFieldType.SELECT) {
            return (
              <SelectField
                {...field}
                disabled={disabled}
                options={options}
                name={name}
                control={control as Control<ILegalAddress>}
              />
            );
          }

          return (
            <>
              <StyledTextField
                {...field}
                fullWidth
                placeholder={placeholder}
                variant="outlined"
                size="small"
                error={!!error}
                aria-invalid={!!error}
                disabled={disabled}
                data-testid="input"
              />
              {error && (
                <ErrorMessage data-testid="error">{error.message}</ErrorMessage>
              )}
            </>
          );
        }}
      />
    </FormControl>
  );
};
