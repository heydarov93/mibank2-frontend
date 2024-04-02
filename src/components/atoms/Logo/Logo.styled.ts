import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledLogo = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: spacing(1),
}));

export const StyledLogoNameContainer = styled(Box)(() => ({
  maxWidth: '100px',
  lineHeight: '22px',
}));

export const LogoContainer = styled(Box)(() => ({
  height: '50px',
  width: '50px',
}));
