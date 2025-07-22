import { styled, Typography } from '@mui/material';

export const DepositContainer = styled('div')(
  ({ theme: { palette, spacing } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    gap: spacing(3),
    width: '100%',
    padding: spacing(0, 5),
    backgroundColor: palette.common.white,
    borderRadius: spacing(2),
    boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,
  }),
);

export const StyledContentContainer = styled('div')(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: spacing(5, 0),
  }),
);

export const StyledDepositName = styled(Typography)(
  ({ theme: { palette, spacing } }) => ({
    color: palette.common.black,
    fontWeight: 600,
    fontSize: spacing(3),
  }),
);

export const StyledSecondaryName = styled(Typography)(
  ({ theme: { palette } }) => ({
    color: palette.common.black,
    fontWeight: 500,
    fontSize: '16px',
  }),
);

export const StyledDescription = styled(Typography)(
  ({ theme: { palette } }) => ({
    color: palette.grey[400],
    fontWeight: 400,
    fontSize: '16px',
    maxWidth: '313px',
  }),
);

export const StyledDescriptionItems = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledDepositIllustration = styled('img')(() => ({
  width: '256px',
  height: '256px',
}));
