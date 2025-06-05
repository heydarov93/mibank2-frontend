import { SvgIcon, SxProps, Theme } from '@mui/material';

import { ReactComponent as RedMinusSVG } from 'assets/icons/RedMinus.svg';

interface RedMinusIconProps {
  sx?: SxProps<Theme>;
}

const RedMinusIcon = ({ sx }: RedMinusIconProps) => {
  return (
    <SvgIcon
      sx={{
        ...sx,
      }}
    >
      <RedMinusSVG />;
    </SvgIcon>
  );
};

export default RedMinusIcon;
