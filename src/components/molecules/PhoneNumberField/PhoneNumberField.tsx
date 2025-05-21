import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldErrors,
} from 'react-hook-form';
import { PhoneInputProps } from 'react-phone-input-2';

import {
  ShakeWrapper,
  StyledErrorText,
  StyledPhoneNumberField,
} from './PhoneNumberField.styled';

import { IPersonalInfo } from 'models/IRegistration';

interface PhoneNumberFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors: FieldErrors<IPersonalInfo>;
  className?: string;
  onChange?: PhoneInputProps['onChange'];
}

export const PhoneNumberField = <T extends FieldValues>({
  name,
  control,
  errors,
  className,
  onChange,
}: PhoneNumberFieldProps<T>) => {
  const hasError = !!errors.phoneNumber;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ShakeWrapper className={className}>
          <StyledPhoneNumberField
            {...field}
            country="pl"
            countryCodeEditable={false}
            value={field.value}
            onBlur={field.onBlur}
            hasError={hasError}
            onChange={(value, data, event, formattedValue) => {
              field.onChange(value);
              onChange?.(value, data, event, formattedValue);
            }}
          />
          <StyledErrorText>
            {errors.phoneNumber && (
              <span className="errorText">{errors.phoneNumber?.message}</span>
            )}
          </StyledErrorText>
        </ShakeWrapper>
      )}
    />
  );
};
