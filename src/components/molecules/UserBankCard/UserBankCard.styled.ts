import { Box, styled } from '@mui/material';

export const StyledContainer = styled(Box)(({ theme: { palette } }) => ({
  backgroundColor: '#28438B', //!TODO need to get the actual background from server
  color: palette.common.white,
  padding: '16em',
  borderRadius: '12em',
}));

export const StyledTopBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}));

export const StyledBtmBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: '16em',
}));
