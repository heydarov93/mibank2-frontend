import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import { KeyboardEvent, ReactNode } from 'react';
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

import { POLISH_CITIES } from 'constants/data/geo';

interface CitySelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  error?: FieldError;
  className?: string;
  helperText?: string | ReactNode;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

interface CityOptionType {
  city: string;
  voivodeship: string;
}

const filterOptions = (
  options: CityOptionType[],
  { inputValue }: { inputValue: string },
) => {
  const lowercasedInput = inputValue.toLowerCase();

  return options.filter((option) =>
    option.city.toLowerCase().startsWith(lowercasedInput),
  );
};

export const CitySelectField = <T extends FieldValues>({
  name,
  control,
  error,
  className,
  helperText,
  onKeyDown,
}: CitySelectFieldProps<T>) => {
  const { t } = useTranslation('translation');

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Autocomplete<CityOptionType>
            {...field}
            options={POLISH_CITIES}
            filterOptions={filterOptions}
            getOptionLabel={(option) => `${option.city}, ${option.voivodeship}`}
            onChange={(_, value) => field.onChange(value?.city || '')}
            isOptionEqualToValue={(option, value) =>
              option.city === (value as CityOptionType)?.city
            }
            value={
              POLISH_CITIES.find((option) => option.city === field.value) ||
              null
            }
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
                helperText={
                  helperText || error?.message || fieldState.error?.message
                }
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
