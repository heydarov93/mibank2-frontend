import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, InputAdornment } from '@mui/material';
import { memo, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface InputArrowDownIconProps {
  onDropdownToggle: (event: MouseEvent) => void;
  isDropdownOpen: boolean;
}

export const InputArrowDownIcon = memo<InputArrowDownIconProps>(
  ({ onDropdownToggle, isDropdownOpen }: InputArrowDownIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <InputAdornment position="end">
        <IconButton
          onClick={onDropdownToggle}
          size="small"
          aria-label={t('label.arrowDown')}
          aria-expanded={isDropdownOpen}
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
  },
);

InputArrowDownIcon.displayName = 'InputArrowDownIcon';
