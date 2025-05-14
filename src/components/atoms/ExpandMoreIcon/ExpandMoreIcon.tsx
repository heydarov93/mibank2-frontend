import { SvgIcon, SxProps } from '@mui/material';

import { ReactComponent as ExpandMore } from 'assets/icons/ExpandMoreIcon.svg';

interface ExpandMoreIconProps {
  sx?: SxProps;
}

export const ExpandMoreIcon = (props: ExpandMoreIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <ExpandMore />
  </SvgIcon>
);
