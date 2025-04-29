import { SvgIcon, SxProps, Theme } from '@mui/material';

import { ReactComponent as Visa } from 'assets/icons/Visa.svg';

interface VisaIconProps {
  sx?: SxProps<Theme>;
}

export const VisaIcon = ({ sx }: VisaIconProps) => (
  <SvgIcon sx={{ ...sx }}>
    <Visa width="100%" height="100%" />
  </SvgIcon>
);
