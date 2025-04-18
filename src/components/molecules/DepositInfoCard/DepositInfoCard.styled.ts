import { Box, IconButton, styled, Typography } from '@mui/material';

export const StyledCardContainer = styled(Box)(
  ({ theme: { spacing, palette } }) => ({
    position: 'relative',
    maxWidth: '500px',
    padding: spacing(5),
    backgroundColor: palette.bg.lightBlue,
  }),
);

export const StyledInfoCardTitle = styled(Typography)(
  ({ theme: { typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '125%',
    letterSpacing: 0,
  }),
);

export const StyledInfoCardColumn = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '35px',
  maxWidth: '165px',
  margin: '24px 0px',
}));

export const StyledInfoCardDesc = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: 0,
    color: palette.grey[400],
    marginBottom: '30px',
  }),
);

export const StyledInfoCardSubTitle = styled(Typography)(
  ({ theme: { typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '100%',
    letterSpacing: 0,
  }),
);

export const StyledInfoCardMainText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    color: palette.common.black,
    lineHeight: '24px',
    letterSpacing: 0,
    fontSize: '16px',
  }),
);

export const StyledInfoCardSecondaryText = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    color: palette.grey[400],
    lineHeight: '24px',
    letterSpacing: 0,
    fontSize: '16px',
  }),
);

export const StyledBlueTickIcon = styled(Typography)(
  ({ theme: { palette } }) => ({
    color: palette.primary.dark,
    position: 'absolute',
    width: '18px',
    height: '18px',
  }),
);

export const StyledCloseButton = styled(IconButton)(
  ({ theme: { spacing, palette } }) => ({
    backgroundColor: 'transparent',
    color: palette.grey[400],
    padding: spacing(1),
    borderRadius: spacing(1),
    '&:hover': {
      backgroundColor: palette.shadow.shadowLight,
    },
  }),
);

export const StyledDepositIllustration = styled('img')(() => ({
  position: 'absolute',
  top: '70px',
  right: '40px',
  width: '250px',
  height: '250px',
}));
