import { SvgIcon, SxProps, Theme } from '@mui/material';

import { ReactComponent as Mastercard } from 'assets/icons/Mastercard.svg';

interface MastercardIconProps {
  sx?: SxProps<Theme>;
}

export const MastercardIcon = ({ sx }: MastercardIconProps) => (
  <SvgIcon sx={{ ...sx }}>
    <Mastercard width="100%" height="100%" />
  </SvgIcon>
);
