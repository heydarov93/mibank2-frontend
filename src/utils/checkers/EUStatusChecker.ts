import { countries } from 'constants/countries';

export const checkEUStatus = (countryLabel: string) => {
  return countries.some(
    (country) => country.label === countryLabel && country.isInEurope,
  );
};
