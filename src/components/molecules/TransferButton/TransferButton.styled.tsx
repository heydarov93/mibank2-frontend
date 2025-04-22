import { Box, Button, styled } from '@mui/material';

export const StyledIconContainer = styled(Box)(({ theme: { palette } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '56px',
  height: '56px',
  color: palette.primary.main,
  borderRadius: '50%',
  boxShadow: `0px 3px 8px 0px ${palette.grey[100]}`,
}));

export const StyledContainer = styled(Button)(({ theme: { palette } }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'start',
  gap: '8px',
  padding: '16px',
  border: `1px solid ${palette.grey[100]}`,
  borderRadius: '8px',
  boxShadow: `0px 3px 8px 0px ${palette.grey[100]}`,
}));
