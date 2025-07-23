import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as PlusSVG } from 'assets/icons/ButtonPlusIcon.svg';

interface PlusIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const PlusIcon = memo<PlusIconProps>(
  ({ sx, ...props }: PlusIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        viewBox="0 0 15 16"
        sx={sx}
        role="img"
        aria-label={t('label.plus')}
        {...props}
      >
        <PlusSVG />
      </SvgIcon>
    );
  },
);

PlusIcon.displayName = 'PlusIcon';
