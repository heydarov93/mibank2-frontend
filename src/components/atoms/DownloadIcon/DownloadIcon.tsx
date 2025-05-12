import { SvgIcon, SvgIconProps } from '@mui/material';

import { ReactComponent as Download } from 'assets/icons/Download.svg';

export const DownloadIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <Download />
    </SvgIcon>
  );
};
