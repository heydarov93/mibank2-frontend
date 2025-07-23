import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as BlueTickSVG } from 'assets/icons/BlueTick.svg';

interface BlueTickIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const BlueTickIcon = memo<BlueTickIconProps>(
  ({ sx, ...props }: BlueTickIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        viewBox="0 0 40 40"
        sx={sx}
        role="img"
        aria-label={t('label.blueTick')}
        {...props}
      >
        <BlueTickSVG />
      </SvgIcon>
    );
  },
);

BlueTickIcon.displayName = 'BlueTickIcon';
