import { Box } from '@mui/material';
import React from 'react';

import { VerificationCode } from './VerificationCode';

interface VerificationFieldProps {
  isCodeCorrect: boolean;
  isFormDisabled: boolean;
  isCodeWrong: boolean;
  onChange: (value: string) => void;
  value: string;
}

const VerificationField = ({
  isCodeCorrect,
  isFormDisabled,
  isCodeWrong,
  onChange,
  value,
}: VerificationFieldProps) => {
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
        onChange={onChange}
        isCodeCorrect={isCodeCorrect}
        isFormDisabled={isFormDisabled}
        isCodeWrong={isCodeWrong}
        length={6}
      />
    </Box>
  );
};

export const MemoizedVerificationField = React.memo(VerificationField);
