import { Stack, SxProps, Theme } from '@mui/material';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledSwitch, StyledSwitchTitle } from './SwitchButton.styled';

interface SwitchButtonProps {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  sx?: SxProps<Theme>;
}

export const SwitchButton = memo<SwitchButtonProps>(
  ({ isChecked, setIsChecked, sx }: SwitchButtonProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    const handleChange = useCallback(() => {
      setIsChecked(!isChecked);
    }, [isChecked, setIsChecked]);

    return (
      <Stack direction="row" alignItems="center" spacing={1} sx={sx}>
        <StyledSwitchTitle
          sx={({ palette }) => ({
            color: isChecked ? palette.primary.main : palette.grey[400],
          })}
        >
          {isChecked ? 'Active' : 'Closed'}
        </StyledSwitchTitle>
        <StyledSwitch
          checked={isChecked}
          onChange={handleChange}
          aria-checked={isChecked}
          aria-label={t('label.switch')}
        />
      </Stack>
    );
  },
);

SwitchButton.displayName = 'SwitchButton';
