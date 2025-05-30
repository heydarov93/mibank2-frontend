import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledButton = styled(Button)(({ theme: { spacing } }) => ({
  borderRadius: '8px',
  minWidth: '133px',
  boxShadow: 'none',
  padding: `${spacing(1)} ${spacing(3)}}`,
  '&:hover': { boxShadow: 'none' },
}));
