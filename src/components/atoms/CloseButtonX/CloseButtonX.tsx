import { SvgIcon, SxProps, Theme } from '@mui/material';

import { ReactComponent as CloseButton } from 'assets/icons/CloseIcon.svg';

interface CloseButtonProps {
  onClick: () => void;
  sx?: SxProps<Theme>;
}

const CloseButtonX = ({ onClick, sx }: CloseButtonProps) => {
  return (
    <SvgIcon
      sx={{
        ...sx,
      }}
    >
      <CloseButton data-testid="close-button" onClick={onClick} />
    </SvgIcon>
  );
};

export default CloseButtonX;
