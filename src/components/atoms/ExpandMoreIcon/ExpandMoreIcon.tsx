import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ExpandMoreSVG } from 'assets/icons/ExpandMoreIcon.svg';

interface ExpandMoreIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const ExpandMoreIcon = memo<ExpandMoreIconProps>(
  ({ sx, ...props }: ExpandMoreIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        viewBox="0 0 24 24"
        sx={sx}
        role="img"
        aria-hidden="true"
        aria-label={t('label.expandMore')}
        {...props}
      >
        <ExpandMoreSVG />
      </SvgIcon>
    );
  },
);

ExpandMoreIcon.displayName = 'ExpandMoreIcon';
