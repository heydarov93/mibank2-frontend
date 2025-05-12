import { SvgIcon, SvgIconProps } from '@mui/material';

import { ReactComponent as Share } from 'assets/icons/Share.svg';

export const ShareIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <Share />
    </SvgIcon>
  );
};
