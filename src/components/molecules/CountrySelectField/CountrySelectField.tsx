import { Autocomplete, Box, createFilterOptions } from '@mui/material';
import { KeyboardEvent, ReactNode } from 'react';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldError,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { StyledCountrySelectField } from './CountrySelectField.styled';

import { countries } from 'constants/data/geo';

interface CountrySelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  className?: string;
  helperText?: string | ReactNode;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

interface CountryOptionType {
  code: string;
  label: string;
  phone: string;
  isInEurope?: boolean;
}

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: CountryOptionType) => option.label,
});

export const CountrySelectField = <T extends FieldValues>({
  name,
  control,
  error,
  helperText,
  className,
  onKeyDown,
}: CountrySelectFieldProps<T>) => {
  const { t } = useTranslation('translation');
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Autocomplete<CountryOptionType>
            {...field}
            options={countries}
            getOptionLabel={(option) => option.label}
            filterOptions={filterOptions}
            onChange={(_, value) => field.onChange(value?.label || '')}
            isOptionEqualToValue={(option, value) =>
              option.label === value?.label
            }
            value={
              countries.find((country) => country.label === field.value) || null
            }
            renderOption={(props, option) => (
              <Box key={option.label} component="li" {...props}>
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <StyledCountrySelectField
                {...params}
                placeholder={t('RegistrationPage.placeholder.selectField')}
                error={!!error}
                helperText={helperText || error?.message}
                className={className}
                onKeyDown={onKeyDown}
              />
            )}
          />
        );
      }}
    />
  );
};
