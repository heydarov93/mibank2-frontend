import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)(() => ({
  borderRadius: '8px',
  minWidth: '133px',
  boxShadow: 'none',
  '&:hover': { boxShadow: 'none' },
}));
