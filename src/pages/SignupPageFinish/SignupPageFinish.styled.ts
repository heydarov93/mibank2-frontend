import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const StyledTitle = styled('h2')(({ theme: { palette } }) => ({
  marginBottom: 0,
  fontSize: '32px',
  fontWeight: 500,
  lineHeight: '37.5px',
  color: palette.common.black,
}));

export const StyledText = styled('p')(({ theme: { palette } }) => ({
  marginBottom: 0,
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  color: palette.common.black,
}));

export const StyledLink = styled(Link)(({ theme: { palette } }) => ({
  textDecoration: 'underline',
  marginLeft: '10px',
  fontSize: '16px',
  fontWeight: 500,
  lineHeight: '20px',
  letterSpacing: '0.1px',
  color: '#1C64EE',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: palette.primary.main,
  },
}));
