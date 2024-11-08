import { Autocomplete, Box } from '@mui/material';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldError,
} from 'react-hook-form';

import { StyledCountrySelectField } from './CountrySelectField.styled';

import { countries } from 'constants/countries';

interface CountrySelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  className?: string;
}

export const CountrySelectField = <T extends FieldValues>({
  name,
  control,
  error,
  className,
}: CountrySelectFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        // TODO: use this later to store EU country info
        // const selectedCountry = countries.find(
        //   (country) => country.label === field.value,
        // );

        return (
          <Autocomplete
            {...field}
            options={countries}
            disableClearable
            getOptionLabel={(option) => option.label}
            onChange={(_, value) => field.onChange(value?.label)}
            isOptionEqualToValue={(option, value) =>
              option.label === value?.label
            }
            value={field.value || undefined}
            renderOption={(props, option) => (
              <Box key={option.label} component="li" {...props}>
                {option.label}
              </Box>
            )}
            renderInput={(params) => (
              <StyledCountrySelectField
                {...params}
                placeholder="Choose here"
                error={!!error}
                className={className}
              />
            )}
          />
        );
      }}
    />
  );
};
