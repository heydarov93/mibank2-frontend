import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as SettingSVG } from 'assets/icons/Settings.svg';

interface SettingsButtonProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const SettingsButton = memo<SettingsButtonProps>(
  ({ sx, ...props }: SettingsButtonProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        sx={sx}
        role="button"
        aria-label={t('label.settings')}
        {...props}
      >
        <SettingSVG style={{ cursor: 'pointer' }} />;
      </SvgIcon>
    );
  },
);

SettingsButton.displayName = 'SettingsButton';
