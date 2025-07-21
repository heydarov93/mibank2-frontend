import { SvgIcon, SvgIconProps } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as DownloadSVG } from 'assets/icons/Download.svg';

interface DownloadIconProps extends Omit<SvgIconProps, 'children'> {
  sx?: SvgIconProps['sx'];
}

export const DownloadIcon = memo<DownloadIconProps>(
  ({ sx, ...props }: DownloadIconProps) => {
    const { t } = useTranslation('translation', {
      keyPrefix: 'Accessibility',
    });

    return (
      <SvgIcon sx={sx} role="img" aria-label={t('label.download')} {...props}>
        <DownloadSVG />
      </SvgIcon>
    );
  },
);

DownloadIcon.displayName = 'DownloadIcon';
