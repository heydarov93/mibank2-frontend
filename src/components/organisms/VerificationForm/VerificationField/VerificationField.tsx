import { Box } from '@mui/material';

import { VerificationCode } from './VerificationCode';

interface VerificationFieldProps {
  isCodeCorrect: boolean;
  isFormDisabled: boolean;
  onChange: (value: string) => void;
  value: string;
}

export const VerificationField = ({
  isCodeCorrect,
  isFormDisabled,
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
        length={6}
      />
    </Box>
  );
};
