import { Button, DialogActions, styled, Typography } from '@mui/material';

export const StyledTitle = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '32px',
    fontWeight: 500,
    lineHeight: '100%',
    color: palette.grey[500],
    textAlign: 'center',
  }),
);

export const StyledBody = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '150%',
    color: palette.grey[400],
    textAlign: 'center',
  }),
);

export const StyledButtonRow = styled(DialogActions)(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing(1),
  }),
);

export const StyledButton = styled(Button)(
  ({ theme: { typography, spacing } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '100%',
    textAlign: 'center',
    padding: spacing(1, 3),
    height: '50px',
    borderRadius: '8px',
  }),
);
