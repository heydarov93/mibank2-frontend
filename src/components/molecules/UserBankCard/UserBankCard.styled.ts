import { Box, styled, Typography } from '@mui/material';

export const SIDEBAR_USER_CARD_WIDTH = 288;
export const SLIDE_USER_CARD_WIDTH = 250;

export const StyledContainer = styled(Box)<{
  isSelected?: boolean;
  isSlide?: boolean;
}>(({ theme: { spacing, palette }, isSelected, isSlide }) => ({
  backgroundColor: '#28438B', // TODO need to get the actual background from server
  color: palette.common.white,
  padding: spacing(2),
  borderRadius: '12px',
  width: '100%',
  maxWidth: isSlide ? SLIDE_USER_CARD_WIDTH : SIDEBAR_USER_CARD_WIDTH,
  minWidth: isSlide ? SLIDE_USER_CARD_WIDTH : SIDEBAR_USER_CARD_WIDTH,
  transition: 'all 0.3s ease',
  cursor: 'pointer',

  ...(isSelected &&
    isSlide && {
      transform: 'scale(1.02)',
    }),
}));

export const StyledTopBox = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
}));

export const StyledBottomBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
}));

export const StyledBottomLeft = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: spacing(1.25),
}));

export const StyledBottomRight = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing(1),
}));

export const StyledBalanceLabel = styled(Typography)(
  ({ theme: { typography, spacing } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '100%',
    margin: spacing(2.5, 0),
  }),
);

export const StyledCardTextMedium = styled(Typography)(
  ({ theme: { typography } }) => ({
    fontFamily: typography.smallLogo?.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
  }),
);

export const StyledCardTextSmall = styled(Typography)(
  ({ theme: { typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
  }),
);
