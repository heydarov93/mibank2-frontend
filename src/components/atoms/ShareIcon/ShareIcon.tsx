import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as ShareSVG } from 'assets/icons/Share.svg';

interface ShareIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const ShareIcon = memo<ShareIconProps>(
  ({ sx, ...props }: ShareIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon sx={sx} role="img" aria-label={t("label.share")} {...props}>
        <ShareSVG />
      </SvgIcon>
    );
  },
);

ShareIcon.displayName = 'ShareIcon';
