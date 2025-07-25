import { Box, styled, Typography } from '@mui/material';

export const StyledImgBanner = styled('img')(() => ({
  width: '974px',
  height: '197px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 0,
}));

export const StyledSlideWrapper = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
}));

export const StyledContentWrapper = styled(Box)(() => ({
  position: 'absolute',
  top: '32px',
  left: '71px',
}));

export const StyledTitle = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    color: palette.common.white,
    fontFamily: typography.smallLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '125%',
    letterSpacing: 0,
  }),
);

export const StyledDesc = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    color: palette.common.white,
    fontFamily: typography.smallLogo?.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: 0,
  }),
);

export const StyledOverlay = styled(Box)(({ theme: { palette } }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: palette.shadow.shadowLight,
  zIndex: 1,
}));

export const StyledButton = styled('button')(
  ({ theme: { palette, typography } }) => ({
    position: 'absolute',
    bottom: '30px',
    left: '71px',
    height: '48px',
    padding: '8px 24px',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: palette.common.white,
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.black,
    fontWeight: 500,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '100%',
    letterSpacing: 0,
    zIndex: 10,
    cursor: 'pointer',
    border: 'none',
  }),
);
