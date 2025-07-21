import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as CloseSVG } from 'assets/icons/CloseIcon.svg';

interface CloseButtonProps extends Omit<SvgIconProps, 'component'> {
  onClick: () => void;
}


export const CloseButton = memo<CloseButtonProps>(
  ({ onClick, sx, ...props }: CloseButtonProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon
        sx={sx}
        onClick={onClick}
        role="button"
        aria-label={t('label.close')}
        {...props}
      >
        <CloseSVG data-testid="close-button" />
      </SvgIcon>
    );
  },
);

CloseButton.displayName = 'CloseButton';
