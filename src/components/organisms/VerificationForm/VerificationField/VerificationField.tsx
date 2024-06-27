import { Box } from '@mui/material';

import { VerificationCode } from './VerificationCode';

interface VerificationFieldProps {
  isFormDisabled: boolean;
  onChange: (value: string) => void;
  value: string;
}

export const VerificationField = ({
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
        isFormDisabled={isFormDisabled}
        length={6}
      />
    </Box>
  );
};
