import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledCityMenuItem,
  StyledCityMenuText,
} from '../AddressRegisterForm.styled';

interface CityMenuItemProps {
  city: string;
  onCitySelect: (city: string) => void;
  isSelected: boolean;
}

export const CityMenuItem = memo<CityMenuItemProps>(
  ({ city, onCitySelect, isSelected }: CityMenuItemProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });
    const handleSelect = useCallback(() => {
      onCitySelect(city);
    }, [onCitySelect, city]);

    return (
      <StyledCityMenuItem
        role="option"
        aria-selected={isSelected}
        aria-label={t('label.cityMenu')}
        tabIndex={0}
        key={city}
        onClick={handleSelect}
        sx={({ palette }) => ({
          backgroundColor: isSelected ? palette.primary.light : 'transparent',
          '&:hover, &:focus': {
            backgroundColor: isSelected
              ? palette.primary.light
              : palette.common.white,
          },
        })}
      >
        <StyledCityMenuText
          sx={({ palette }) => ({
            color: isSelected ? palette.primary.main : 'inherit',
            fontWeight: isSelected ? 500 : 400,
          })}
        >
          {city}
        </StyledCityMenuText>
      </StyledCityMenuItem>
    );
  },
);

CityMenuItem.displayName = 'CityMenuItem';
