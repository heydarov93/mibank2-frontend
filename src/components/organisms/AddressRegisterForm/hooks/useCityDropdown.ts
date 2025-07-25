import { useState, useEffect, useCallback, useRef } from 'react';
import { ChangeEvent, MouseEvent } from 'react';
import { Control, useController } from 'react-hook-form';

import { POLISH_CITIES } from 'constants/data/geo';
import { ILegalAddress } from 'models/IRegistration';

export const useCityDropdown = (
  name: keyof ILegalAddress,
  control: Control<ILegalAddress>,
) => {
  const [cityInput, setCityInput] = useState<string>('');
  const [cities] = useState<string[]>(
    POLISH_CITIES.map((cityObj) => cityObj.city).sort((a, b) =>
      a.localeCompare(b, 'pl', { sensitivity: 'base' }),
    ),
  );
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
  });

  useEffect(() => {
    const filtered = cityInput
      ? cities
          .filter((city: string) =>
            city.toLowerCase().includes(cityInput.toLowerCase()),
          )
          .slice(0, 5)
      : cities.slice(0, 5);

    setFilteredCities(filtered);
  }, [cityInput, cities]);

  useEffect(() => {
    if (field.value !== cityInput && field.value !== undefined) {
      setCityInput(field.value || '');
    }
  }, [field.value]);

  const handleCityInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setCityInput(value);

      field.onChange(value);

      if (!isDropdownOpen) {
        setIsDropdownOpen(true);
        setAnchorEl(event.currentTarget);
      }
    },
    [isDropdownOpen, field],
  );

  const handleCitySelect = (city: string) => {
    setCityInput(city);
    field.onChange(city);
    setIsDropdownOpen(false);
  };

  const handleCityInputClick = (event: MouseEvent<HTMLInputElement>) => {
    setIsDropdownOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClickAway = () => {
    setIsDropdownOpen(false);
  };

  const getCityData = (cityName: string) => {
    return POLISH_CITIES.find((cityObj) => cityObj.city === cityName);
  };

  return {
    cityInput,
    filteredCities,
    isDropdownOpen,
    inputRef,
    anchorEl,
    error: fieldError,
    cities,
    getCityData,
    handleCityInputChange,
    handleCitySelect,
    handleCityInputClick,
    handleClickAway,
    field,
  };
};
