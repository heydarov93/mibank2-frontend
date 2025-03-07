import React from 'react';

import { ReactComponent as LogoutButtonDoor } from 'assets/icons/Logout.svg';

interface LogoutButtonProps {
  onClick?: () => void;
}

const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return <LogoutButtonDoor onClick={onClick} style={{ cursor: 'pointer' }} />;
};

export default LogoutButton;
