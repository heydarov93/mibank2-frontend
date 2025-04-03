import { SvgIcon, SxProps, Theme } from '@mui/material';

import { ReactComponent as SuccessfulCreation } from 'assets/icons/SuccessfulCreation.svg';

interface SuccessfulCreationIconProps {
  sx?: SxProps<Theme>;
}

const SuccessfulCreationIcon = ({ sx }: SuccessfulCreationIconProps) => {
  return (
    <SvgIcon sx={{ ...sx }}>
      <SuccessfulCreation width="100%" height="100%" />
    </SvgIcon>
  );
};

export default SuccessfulCreationIcon;
