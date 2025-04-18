import { SvgIcon, SxProps, Theme } from '@mui/material';

import { ReactComponent as DepositCardSvg } from 'assets/icons/DepositCardImg.svg';

interface DepositCardIconProps {
  sx?: SxProps<Theme>;
}

export const DepositCardIcon = ({ sx, ...props }: DepositCardIconProps) => {
  return (
    <SvgIcon sx={{ ...sx }} {...props}>
      <DepositCardSvg />
    </SvgIcon>
  );
};
