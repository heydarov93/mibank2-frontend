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
  maxLength?: number;
  onCut?: (e: SyntheticEvent) => void;
  onCopy?: (e: SyntheticEvent) => void;
  onKeyUp?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: SyntheticEvent) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (e: SyntheticEvent) => void;
  onChange?: (e: SyntheticEvent) => void;
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
  InputProps,
  maxLength,
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
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        InputProps={{
          ...InputProps,
          inputProps: {
            maxLength,
            onChange: onChange,
          },
        }}
        {...field}
      />
    )}
  />
);
