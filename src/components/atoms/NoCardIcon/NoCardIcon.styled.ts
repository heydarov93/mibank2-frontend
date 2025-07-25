import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledIconContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 'min-content',
  marginBottom: spacing(4),
}));
