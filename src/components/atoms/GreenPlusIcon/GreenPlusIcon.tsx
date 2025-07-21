import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as GreenPlusSVG } from 'assets/icons/GreenPlus.svg';

interface GreenPlusIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const GreenPlusIcon = memo<GreenPlusIconProps>(
  ({ sx, ...props }: GreenPlusIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon sx={sx} role="img" aria-label={t('label.greenPlus')} {...props}>
        <GreenPlusSVG />
      </SvgIcon>
    );
  },
);

GreenPlusIcon.displayName = 'GreenPlusIcon';
