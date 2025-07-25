import { Box, ClickAwayListener, FormControl, Popper } from '@mui/material';
import { MouseEvent } from 'react';
import type { Control } from 'react-hook-form';

import {
  ErrorMessage,
  StyledCityAutocomplete,
  StyledCityDropdown,
  StyledFieldLabel,
} from '../../AddressRegisterForm.styled';
import { ArrowDownIcon, CityMenuItem } from '../../atoms';
import { useCityDropdown } from '../../hooks/useCityDropdown';

import { ILegalAddress } from 'models/IRegistration';

interface CityFieldProps {
  name: keyof ILegalAddress;
  control: Control<ILegalAddress>;
  label: string;
  placeholder: string;
}

export const CityField = ({
  name,
  control,
  label,
  placeholder,
}: CityFieldProps) => {
  const {
    cityInput,
    filteredCities,
    isDropdownOpen,
    inputRef,
    anchorEl,
    error,
    handleCityInputChange,
    handleCitySelect,
    handleCityInputClick,
    handleClickAway,
  } = useCityDropdown(name, control);

  const handleDropdownToggle = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <FormControl fullWidth>
      <StyledFieldLabel>{label}</StyledFieldLabel>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box>
          <StyledCityAutocomplete
            ref={inputRef}
            fullWidth
            placeholder={placeholder}
            variant="outlined"
            size="small"
            value={cityInput}
            onChange={handleCityInputChange}
            onClick={handleCityInputClick}
            error={!!error}
            disabled={false}
            InputProps={{
              endAdornment: (
                <ArrowDownIcon
                  onDropdownToggle={handleDropdownToggle}
                  isDropdownOpen={isDropdownOpen}
                />
              ),
            }}
            inputProps={{
              'aria-label': label,
            }}
          />
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
          <Popper
            open={isDropdownOpen}
            anchorEl={anchorEl}
            placement="bottom-start"
            style={{ width: inputRef.current?.offsetWidth, zIndex: 1300 }}
            data-testid="dropdown-popper"
          >
            <StyledCityDropdown>
              {filteredCities.map((city) => {
                const isSelected = cityInput === city;
                return (
                  <CityMenuItem
                    key={city}
                    city={city}
                    isSelected={isSelected}
                    onCitySelect={handleCitySelect}
                  />
                );
              })}
            </StyledCityDropdown>
          </Popper>
        </Box>
      </ClickAwayListener>
    </FormControl>
  );
};
