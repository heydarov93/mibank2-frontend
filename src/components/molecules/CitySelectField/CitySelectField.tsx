import { Autocomplete, Box, createFilterOptions } from '@mui/material';
import { KeyboardEvent } from 'react';
import {
  Controller,
  Control,
  FieldValues,
  Path,
  FieldError,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  StyledCitySelectField,
  StyledCityText,
} from './CitySelectField.styled';

import { citiesInPoland } from 'constants/citiesInPoland';

interface CountrySelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  className?: string;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

interface CityOptionType {
  city: string;
  voivodeship: string;
}

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: CityOptionType) => option.city,
});

export const CitySelectField = <T extends FieldValues>({
  name,
  control,
  error,
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
          <Autocomplete
            {...field}
            options={citiesInPoland}
            disableClearable
            filterOptions={filterOptions}
            getOptionLabel={(option) => `${option.city}, ${option.voivodeship}`}
            onChange={(_, value) => field.onChange(value.city)}
            isOptionEqualToValue={(option, value) =>
              option.city === value?.city
            }
            value={field.value || undefined}
            renderOption={(props, option) => (
              <Box key={option.city} component="li" {...props}>
                <StyledCityText>
                  <span>{option.city} </span>
                  <span className="voivodeship-text">{option.voivodeship}</span>
                </StyledCityText>
              </Box>
            )}
            renderInput={(params) => (
              <StyledCitySelectField
                {...params}
                placeholder={t('RegistrationPage.placeholder.selectField')}
                error={!!error}
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
