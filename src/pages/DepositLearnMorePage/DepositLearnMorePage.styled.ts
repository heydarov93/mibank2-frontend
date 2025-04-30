import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, styled } from '@mui/material';

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

export const StyledBackButton = styled(Button)(({ theme: { palette } }) => ({
  position: 'absolute',
  top: '8px',
  left: '72px',
  paddingInline: '16px',
  color: palette.common.black,
}));

export const StyledBackArrowIcon = styled(ArrowBackIcon)(
  ({ theme: { palette } }) => ({
    width: '19px',
    height: '19px',
    color: palette.common.black,
  }),
);
