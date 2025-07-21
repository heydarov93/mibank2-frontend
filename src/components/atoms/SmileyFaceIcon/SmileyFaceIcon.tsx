import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as SmileySVG } from 'assets/icons/SmileyIcon.svg';

interface SmileyFaceIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const SmileyFaceIcon = memo<SmileyFaceIconProps>(
  ({ sx, ...props }: SmileyFaceIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        viewBox="0 0 48 48"
        sx={{ width: '48px', height: '48px', ...sx }}
        role="img"
        aria-label={t('label.smileyFace')}
        {...props}
      >
        <SmileySVG />
      </SvgIcon>
    );
  },
);

SmileyFaceIcon.displayName = 'SmileyFaceIcon';
