import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { SIDEBAR_WIDTH } from 'App.styled';

export const StyledContainer = styled(Box)(() => ({
  width: SIDEBAR_WIDTH,
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
