import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const MainContainer = styled(Box)(({ theme: { palette, spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  gap: '32px',
  padding: spacing(5),
  border: `1px solid ${palette.grey[400]}`,
  borderRadius: '16px',
  width: '458px',
}));

export const StyledTitle = styled(Typography)(({ theme: { typography } }) => ({
  fontFamily: typography.mediumLogo?.fontFamily,
  fontSize: '32px',
  fontWeight: '500',
}));

export const SecondaryText = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.grey[400],
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: typography.secondaryText?.lineHeight,
    fontWeight: '400',
    paddingRight: spacing(2),
  }),
);

export const SecondaryProductText = styled(Typography)(
  ({ theme: { typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: typography.secondaryText?.lineHeight,
    fontWeight: '500',
  }),
);

export const InformationBox = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
}));
