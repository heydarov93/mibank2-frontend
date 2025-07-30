import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Box)(() => ({
  width: '385px',
  display: 'flex',
  alignSelf: 'center',
  position: 'relative',
}));

export const StyledCardContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}));
