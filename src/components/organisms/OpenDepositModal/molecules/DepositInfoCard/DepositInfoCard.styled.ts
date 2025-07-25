import { Box, IconButton, List, styled, Typography } from '@mui/material';

export const StyledCardContainer = styled(Box)(
  ({ theme: { spacing, palette } }) => ({
    position: 'relative',
    minWidth: '500px',
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
    minHeight: '150px',
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



export const StyledCloseButton = styled(IconButton)(
  ({ theme: { spacing, palette } }) => ({
    position: 'absolute',
    right: spacing(5),
    top: spacing(5),
    backgroundColor: 'transparent',
    color: palette.grey[400],
    padding: spacing(1),
    borderRadius: spacing(1),
    '&:hover': {
      backgroundColor: palette.shadow.shadowLight,
    },
  }),
);

export const StyledBenefitList = styled(List)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

export const StyledDepositIllustration = styled('img')(() => ({
  position: 'absolute',
  top: '70px',
  right: '40px',
  width: '250px',
  height: '250px',
}));
