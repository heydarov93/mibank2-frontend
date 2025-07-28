import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as TrashSVG } from 'assets/icons/TrashIcon.svg';

interface TrashIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const TrashIcon = memo<TrashIconProps>(
  ({ sx, ...props }: TrashIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        viewBox="0 0 12 12"
        sx={sx}
        role="img"
        aria-label={t('label.trash')}
        {...props}
      >
        <TrashSVG />
      </SvgIcon>
    );
  },
);

TrashIcon.displayName = 'TrashIcon';
