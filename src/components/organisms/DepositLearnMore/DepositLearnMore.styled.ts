import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, styled } from '@mui/material';

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    backgroundColor: palette.primary.light,
    padding: spacing(5),
    paddingBottom: spacing(9.5),
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(14),
  }),
);

export const StyledBackArrowIcon = styled(ArrowBackIcon)(
  ({ theme: { palette } }) => ({
    width: '19px',
    height: '19px',
    color: palette.common.black,
  }),
);
