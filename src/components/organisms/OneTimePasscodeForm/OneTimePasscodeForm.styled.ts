import { OutlinedInput, styled } from '@mui/material';

export const DigitInput = styled(OutlinedInput)(({ theme: { palette } }) => ({
  width: '48px',
  height: '48px',
  border: `1px solid ${palette.grey[400]}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  boxSizing: 'border-box',
  padding: '0',
  '& input': {
    padding: '0',
    textAlign: 'center',
    outline: 'none',
  },
  borderRadius: '8px',
}));
