import { styled } from '@mui/material/styles';

export const StyledFooterWrapper = styled('footer')(
  ({ theme: { palette, spacing, breakpoints } }) => ({
    backgroundColor: palette.common.white,
    padding: spacing(3, 2),
    [breakpoints.up('sm')]: {
      padding: spacing(3, 4),
    },
    boxShadow: `0px -2px 15px 0px ${palette.grey[200]}`,
  }),
);
