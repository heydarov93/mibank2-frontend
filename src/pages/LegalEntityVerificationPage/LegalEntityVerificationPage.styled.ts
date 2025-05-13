import { Box, styled } from '@mui/material';

export const StyledContentWrapper = styled(Box)(() => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

export const StyledPageLayout = styled(Box)(() => ({
  minHeight: '125vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));
