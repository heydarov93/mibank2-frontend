import { SxProps, Theme } from '@mui/material';
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
  name = 'name',
  firstName = 'firstName',
  lastName = 'lastName',
  surname = 'surname',
  dateOfBirth = 'dateOfBirth',
  phoneNumber = 'phoneNumber',
  passportNumber = 'passportNumber',
  peselNumber = 'peselNumber',
  street = 'street',
  building = 'building',
  apartment = 'apartment',
  postcode = 'postcode',
  idCardNumber = 'idCardNumber',
  documentNumber = 'documentNumber',
  verificationCode = 'verificationCode',
  dateAdded = 'dateAdded',
  cashbackRate = 'cashbackRate',
  monthlyFee = 'monthlyFee',
  issueFee = 'issueFee',
  dailyOperationalLimit = 'dailyOperationalLimit',
  foreignTransactionLimit = 'foreignTransactionLimit',
  minimumDepositSum = 'minimumDepositSum',
  maximumDepositSum = 'maximumDepositSum',
  depositTerm = 'depositTerm',
  depositInterestRate = 'depositInterestRate',
  depositCapitalizationRate = 'depositCapitalizationRate',
  earlyWithdrawalLimit = 'earlyWithdrawalLimit',
  withdrawalFee = 'withdrawalFee',
  productName = 'productName',
  cardDescription = 'cardDescription',
  companyEmail = 'companyEmail',
  companyName = 'companyName',
  ownerName = 'ownerName',
  nip = 'nip',
  office = 'office',
  startDate = 'startDate',
  endDate = 'endDate',
}

export interface InputFieldProps<T extends FieldValues> {
  name: Path<T>;
  id: `${FieldName}`;
  control: Control<T>;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: FieldError;
  helperText?: string | ReactNode;
  className?: string;
  InputProps?: {
    endAdornment: JSX.Element;
  };
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  sx?: SxProps<Theme>;
  value?: string;
  readOnly?: boolean;
  'data-testid'?: string;
  active?: boolean;
  onCut?: (e: SyntheticEvent) => void;
  onCopy?: (e: SyntheticEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: SyntheticEvent) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: SyntheticEvent) => void;
  onChange?: (e: SyntheticEvent) => void;
  onClick?: (e: SyntheticEvent) => void;
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
  onKeyDown,
  onPaste,
  onChange,
  onClick,
  InputProps,
  maxLength,
  multiline,
  rows,
  sx,
  value,
  readOnly,
  active,
  'data-testid': testId,
}: InputFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <StyledTextField
        fullWidth
        id={id}
        helperText={helperText || error?.message || fieldState.error?.message}
        className={className}
        error={!!error}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        onCut={onCut}
        onCopy={onCopy}
        onKeyUp={onKeyUp}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        onClick={onClick}
        InputProps={{
          ...InputProps,
          inputProps: {
            maxLength,
            onChange: onChange,
          },
          readOnly,
        }}
        multiline={multiline}
        rows={rows}
        sx={sx}
        data-testid={testId}
        active={active}
        {...field}
        value={value || field.value}
      />
    )}
  />
);
