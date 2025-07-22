import { Box, Typography } from '@mui/material';
import React from 'react';

import { BlueTickIcon } from 'components/atoms';
import { theme } from 'theme/theme';

interface AboutDepositTextProps {
  mainText: string;
  secondaryText: string;
}

export const AboutDepositText = ({
  mainText,
  secondaryText,
}: AboutDepositTextProps) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <BlueTickIcon
        sx={{
          color: theme.palette.primary.main,
          width: '24px',
          height: '24px',
        }}
      />
      <Typography
        sx={{
          fontWeight: 400,
          fontFamily: theme.typography.mediumLogo?.fontFamily,
          fontSize: '16px',
        }}
      >
        {mainText}
      </Typography>
      <Typography
        sx={{
          fontFamily: theme.typography.mediumLogo?.fontFamily,
          fontWeight: 400,
          color: theme.palette.grey[400],
          fontSize: '16px',
        }}
      >
        {secondaryText}
      </Typography>
    </Box>
  );
};
