import { SvgIcon, SxProps, Theme } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as SpinningArrowButton } from 'assets/icons/Reload.svg';

interface ReloadButtonProps {
  sx?: SxProps<Theme>;
}

const ReloadButton = ({ sx, ...props }: ReloadButtonProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleReloadClick = () => {
    navigate(location.pathname, { replace: true });
  };

  return (
    <SvgIcon sx={{ cursor: 'pointer', ...sx }} {...props}>
      <SpinningArrowButton
        role="button"
        aria-label="Reload current page"
        onClick={handleReloadClick}
      />
    </SvgIcon>
  );
};

export default ReloadButton;
