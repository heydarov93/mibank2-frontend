import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldErrors,
} from 'react-hook-form';

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
}

export const PhoneNumberField = <T extends FieldValues>({
  name,
  control,
  errors,
  className,
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
