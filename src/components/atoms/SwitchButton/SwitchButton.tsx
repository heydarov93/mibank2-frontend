import { Stack } from '@mui/material';
import React from 'react';

import { StyledSwitch, SwitchTitle } from './SwitchButton.styled';

import { theme } from 'theme/theme';

interface SwitchButtonProps {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
}
const SwitchButton = ({ isActive, setIsActive }: SwitchButtonProps) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <SwitchTitle
        sx={{
          color: isActive
            ? theme.palette.primary.main
            : theme.palette.grey[400],
        }}
      >
        {isActive ? 'Active' : 'Closed'}
      </SwitchTitle>
      <StyledSwitch
        checked={isActive}
        onChange={() => setIsActive(!isActive)}
      />
    </Stack>
  );
};

export default SwitchButton;
