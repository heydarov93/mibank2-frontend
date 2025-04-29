import { Button, styled } from '@mui/material';

export const StyledContainer = styled('div')(({ theme: { palette } }) => ({
  padding: '32px',
  border: `1px solid ${palette.grey[100]}`,
  borderRadius: '8px',
  boxShadow: `0px 3px 8px 0px ${palette.grey[100]}`,
}));

export const StyledBackButton = styled(Button)(({ theme: { palette } }) => ({
  color: palette.common.black,
}));

export const StyledButtonsContainer = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 'min(24px, 5%)',
  maxWidth: '1000px',
  marginTop: '46px',
  marginInline: 'auto',
}));
