import { Box, Button, styled, Typography } from '@mui/material';

export const DepositContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    width: '100%',
    backgroundColor: palette.common.white,
    borderRadius: spacing(2),
    padding: spacing(0, 5),
    display: 'flex',
    justifyContent: 'space-between',
  }),
);

export const StyledContentContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: spacing(5, 0),
  minWidth: '313px',
}));

export const StyledDepositName = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.black,
    fontWeight: 600,
    fontSize: spacing(3),
  }),
);

export const StyledSecondaryName = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.black,
    fontWeight: 500,
    fontSize: spacing(2),
  }),
);

export const StyledDescription = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.grey[400],
    fontWeight: 400,
    fontSize: spacing(2),
    maxWidth: '313px',
  }),
);

export const StyledViewAllButton = styled(Button)(() => ({
  width: '170px',
  height: '56px',
  borderRadius: '8px',
  padding: '8px 24px',
}));

export const StyledDepositIllustration = styled('img')(() => ({
  width: '316px',
  height: '316px',
}));
