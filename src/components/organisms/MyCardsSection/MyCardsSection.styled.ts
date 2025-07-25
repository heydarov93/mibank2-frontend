import { Box, styled } from '@mui/material';

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
