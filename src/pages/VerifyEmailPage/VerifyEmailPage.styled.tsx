import { styled } from '@mui/material/styles';

export const StyledTitle = styled('h2')(({ theme: { palette } }) => ({
  marginBottom: 0,
  fontSize: '32px',
  fontWeight: 500,
  color: palette.common.black,
}));

export const StyledText = styled('p')(({ theme: { palette } }) => ({
  textAlign: 'center',
  marginTop: '6px',
  fontSize: '16px',
  fontWeight: 400,
  color: palette.common.black,
}));
