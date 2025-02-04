import React from 'react';

import { ReactComponent as CloseButton } from 'assets/icons/CloseIcon.svg';

interface CloseButtonProps {
  onClick: () => void;
}

const CloseButtonX = ({ onClick }: CloseButtonProps) => {
  return (
    <CloseButton
      data-testid="close-button"
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    />
  );
};

export default CloseButtonX;
