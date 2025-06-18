import { styled } from '@mui/material';

export const StyledContainer = styled('div')(
  ({ theme: { spacing, palette } }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing(0.75),
    padding: spacing(0.375, 1.375),
    fontSize: 10,
    color: palette.grey[500],
    borderRadius: 8,
  }),
);
