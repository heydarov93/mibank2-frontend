import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, InputAdornment } from '@mui/material';
import { MouseEvent } from 'react';

interface ArrowDownIconProps {
  onDropdownToggle: (event: MouseEvent) => void;
  isDropdownOpen: boolean;
}

export const ArrowDownIcon = ({
  onDropdownToggle,
  isDropdownOpen,
}: ArrowDownIconProps) => {
  return (
    <InputAdornment position="end">
      <IconButton
        onClick={onDropdownToggle}
        size="small"
        sx={({ spacing }) => ({
          transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s ease-in-out',
          padding: spacing(0.5),
        })}
      >
        <KeyboardArrowDownIcon aria-hidden="true" focusable="false" />
      </IconButton>
    </InputAdornment>
  );
};

