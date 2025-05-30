import { SvgIcon, SxProps, Theme } from '@mui/material';

import { ReactComponent as WalletSVG } from 'assets/icons/WalletIcon.svg';

interface WalletIconProps {
  sx?: SxProps<Theme>;
}

const WalletIcon = ({ sx }: WalletIconProps) => {
  return (
    <SvgIcon sx={{ ...sx }}>
      <WalletSVG width="100%" height="100%" />;
    </SvgIcon>
  );
};

export default WalletIcon;
