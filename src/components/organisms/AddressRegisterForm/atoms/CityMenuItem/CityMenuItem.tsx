import {
  StyledCityMenuItem,
  StyledCityMenuText,
} from '../../AddressRegisterForm.styled';

interface CityMenuItemProps {
  city: string;
  onCitySelect: (city: string) => void;
  isSelected: boolean;
}

export const CityMenuItem = ({
  city,
  onCitySelect,
  isSelected,
}: CityMenuItemProps) => {
  return (
    <StyledCityMenuItem
      key={city}
      onClick={() => onCitySelect(city)}
      sx={({ palette }) => ({
        backgroundColor: isSelected ? palette.primary.light : 'transparent',
        '&:hover': {
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
};

