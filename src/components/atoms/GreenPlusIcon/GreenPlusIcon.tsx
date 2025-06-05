import { SvgIcon, SxProps, Theme } from '@mui/material';

import { ReactComponent as GreenPlusSVG } from 'assets/icons/GreenPlus.svg';

interface GreenPlusIconProps {
  sx?: SxProps<Theme>;
}

const GreenPlusIcon = ({ sx }: GreenPlusIconProps) => {
  return (
    <SvgIcon
      sx={{
        ...sx,
      }}
    >
      <GreenPlusSVG />
    </SvgIcon>
  );
};

export default GreenPlusIcon;
