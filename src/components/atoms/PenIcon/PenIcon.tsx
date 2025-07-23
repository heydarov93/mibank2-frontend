import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as EditSVG } from 'assets/icons/EditIcon.svg';

interface PenIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const PenIcon = memo<PenIconProps>(({ sx, ...props }: PenIconProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Accessibility',
  });

  return (
    <SvgIcon
      viewBox="0 0 12 12"
      sx={{ height: '12px', width: '12px', ...sx }}
      role="img"
      aria-label={t('label.pen')}
      {...props}
    >
      <EditSVG />
    </SvgIcon>
  );
});

PenIcon.displayName = 'PenIcon';
