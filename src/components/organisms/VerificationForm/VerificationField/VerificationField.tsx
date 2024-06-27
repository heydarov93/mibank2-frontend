import { Box } from '@mui/material';
import { useState } from 'react';

import { VerificationCode } from './VerificationCode';

export const VerificationField = () => {
  const [value, setValue] = useState('');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        marginTop: 2,
      }}
    >
      <VerificationCode
        separator={<span>-</span>}
        value={value}
        onChange={setValue}
        length={6}
      />
    </Box>
  );
};
