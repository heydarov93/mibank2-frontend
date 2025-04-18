import { SvgIcon, SxProps, Theme } from '@mui/material';

import { ReactComponent as PlusSVG } from 'assets/icons/PlusIcon.svg';

interface PlusIconProps {
  sx?: SxProps<Theme>;
}

const PlusIcon = ({ sx }: PlusIconProps) => {
  return (
    <SvgIcon
      sx={{
        ...sx,
      }}
    >
      <PlusSVG />;
    </SvgIcon>
  );
};

export default PlusIcon;
