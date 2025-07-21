import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as SuccessfulCreationSVG } from 'assets/icons/SuccessfulCreation.svg';

interface SuccessfulCreationIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const SuccessfulCreationIcon = memo<SuccessfulCreationIconProps>(
  ({ sx, ...props }: SuccessfulCreationIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        sx={sx}
        role="img"
        aria-label={t('label.successfulCreation')}
        {...props}
      >
        <SuccessfulCreationSVG width="100%" height="100%" />
      </SvgIcon>
    );
  },
);

SuccessfulCreationIcon.displayName = 'SuccessfulCreationIcon';
