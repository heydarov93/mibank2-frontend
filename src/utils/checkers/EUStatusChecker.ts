import { countries } from 'constants/data/geo';

export const checkEUStatus = (countryLabel: string) => {
  return countries.some(
    (country) => country.label === countryLabel && country.isInEurope,
  );
};
