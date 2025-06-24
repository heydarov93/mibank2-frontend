import { styled } from '@mui/material';

export const StyledContainer = styled('div')(
  ({ theme: { palette, spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(4),
    height: 'min-content',
    padding: spacing(5),
    border: `1px solid ${palette.border.lightBlue}`,
    borderRadius: '8px',
    boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,
  }),
);
