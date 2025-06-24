import { Box, styled, Typography } from '@mui/material';

export const Overlay = styled(Box)(({ theme: { palette } }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: '25%',
  backgroundColor: palette.shadow.shadowMedium,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
}));

export const StyledBox = styled(Box)(({ theme: { palette, spacing } }) => ({
  height: spacing(6),
  width: spacing(6),
  padding: spacing(1),
  backgroundColor: palette.error.light,
  borderRadius: spacing(1),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const MainHeader = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '24px',
    color: palette.common.black,
    fontWeight: 600,
    lineHeight: '28px',
  }),
);

export const SecondaryHeader = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: typography.mediumLogo?.fontSize,
    color: palette.grey[400],
    fontWeight: 400,
    lineHeight: '24px',
  }),
);

export const ProductName = styled('span')(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: typography.mediumLogo?.fontSize,
    color: palette.grey[400],
    fontWeight: 500,
    lineHeight: '18px',
  }),
);

export const MainContainer = styled(Box)(({ theme: { palette, spacing } }) => ({
  height: '220px',
  width: '532px',
  border: `1px solid ${palette.error.main}`,
  borderRadius: spacing(1),
  padding: spacing(4),
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: palette.common.white,
  justifyContent: 'space-between',
  zIndex: 1101,
}));
