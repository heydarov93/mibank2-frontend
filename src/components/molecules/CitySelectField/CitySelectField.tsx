import { Autocomplete, Box } from '@mui/material';
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

  return options.filter(
    (option) =>
      option.city.toLowerCase().startsWith(lowercasedInput) ||
      option.voivodeship.toLowerCase().startsWith(lowercasedInput),
  );
};

export const CitySelectField = <T extends FieldValues>({
  name,
  control,
  error,
  className,
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
              />
            )}
          />
        );
      }}
    />
  );
};
