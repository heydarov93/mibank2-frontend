import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LogoWrapper = styled(Box)(
  ({ theme: { palette, spacing, breakpoints } }) => ({
    paddingBottom: spacing(3),
    borderBottom: `solid 1px ${palette.grey[50]}`,
    [breakpoints.up('md')]: {
      border: 'none',
    },
  }),
);

export const StyledLink = styled(Link)(({ theme: { palette } }) => ({
  display: 'block',
  textDecoration: 'none',
  color: palette.common.black,
}));

export const StyledFlexBox = styled(Box)(
  ({ theme: { spacing, breakpoints } }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: spacing(5),
    [breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    [breakpoints.up('md')]: {
      gap: spacing(12),
    },
    justifyContent: 'space-between',
    padding: spacing(1.5, 0, 3, 0),
  }),
);

export const TypographyGrey = styled(Typography)(
  ({ theme: { palette, spacing, breakpoints } }) => ({
    color: palette.grey[500],
    paddingBottom: spacing(1),
    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
  }),
);
