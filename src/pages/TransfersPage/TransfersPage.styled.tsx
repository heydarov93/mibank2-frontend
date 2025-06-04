import { Button, styled } from '@mui/material';

export const StyledContainer = styled('div')(
  ({ theme: { palette, spacing } }) => ({
    padding: spacing(4),
    border: `1px solid ${palette.grey[100]}`,
    borderRadius: '8px',
    boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,
  }),
);

export const StyledBackButton = styled(Button)(({ theme: { palette } }) => ({
  color: palette.common.black,
}));

export const StyledButtonsContainer = styled('div')(
  ({ theme: { spacing } }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 'min(24px, 5%)',
    maxWidth: '1000px',
    marginTop: spacing(6),
    marginInline: 'auto',
  }),
);
