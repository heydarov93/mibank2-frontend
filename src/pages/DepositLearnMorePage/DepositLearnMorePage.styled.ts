import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, styled, Typography } from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.primary.light,
    minHeight: '100dvh',
    padding: '50px 72px 120px 72px',
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(14),
  }),
);

export const StyledBackBoxContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing(1),
  cursor: 'pointer',
  padding: '14px 24px',
}));

export const StyledBackText = styled(Typography)(
  ({ theme: { typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '100%',
    letterSpacing: 0,
  }),
);

export const StyledBackArrowIcon = styled(ArrowBackIcon)(
  ({ theme: { palette } }) => ({
    width: '19px',
    height: '19px',
    color: palette.common.black,
  }),
);
