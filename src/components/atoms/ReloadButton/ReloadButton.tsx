import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as SpinningArrowButton } from 'assets/icons/Reload.svg';

const ReloadButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleReloadClick = () => {
    navigate(location.pathname, { replace: true });
  };

  return (
    <SpinningArrowButton
      role="button"
      aria-label="Reload current page"
      onClick={handleReloadClick}
    />
  );
};

export default ReloadButton;
