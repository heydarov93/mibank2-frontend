import { SvgIcon, SvgIconProps, useTheme } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as WarningSVG } from 'assets/icons/WarningIcon.svg';

interface WarningIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const WarningIcon = memo<WarningIconProps>(
  ({ sx, ...props }: WarningIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });
    const { palette } = useTheme();

    return (
      <SvgIcon
        viewBox="0 0 20 20"
        sx={sx}
        role="img"
        aria-label={t('label.warning')}
        {...props}
      >
        <WarningSVG color={palette.error.main} />
      </SvgIcon>
    );
  },
);

WarningIcon.displayName = 'WarningIcon';
