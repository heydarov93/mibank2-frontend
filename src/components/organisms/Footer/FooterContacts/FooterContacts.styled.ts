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
  transition: 'color 0.3s ease',
  '&:hover': {
    color: palette.primary.main,
  },
}));

export const StyledBox = styled(Box)(
  ({ theme: { spacing, breakpoints } }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: spacing(3, 0, 3, 0),
    gap: spacing(1),
    [breakpoints.down('sm')]: {
      flexDirection: 'row'
    },
    [breakpoints.down(600)]: {
      flexDirection: 'row',
    },
  })
)

export const StyledFlexBox = styled(Box)(
  ({ theme: { spacing, breakpoints } }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: spacing(3, 0, 3, 0),
    gap: spacing(5),
    [breakpoints.up(600)]: {
      flexDirection: 'row',
    },
    [breakpoints.down(600)]: {
      flexDirection: 'column',

    },
    [breakpoints.up('md')]: {
      gap: spacing(12),
      paddingTop: spacing(1.5),
    },
  }),
);

export const TypographyGrey = styled(Typography)(
  ({ theme: { palette, spacing, breakpoints } }) => ({
    color: palette.grey[400],
    paddingBottom: spacing(1),
    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
  }),
);

export const StyledTypographyWorkingHours = styled(Typography)(
  ({ theme: { palette, breakpoints } }) => ({
    color: palette.common.black,
    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
  }),
);

export const StyledFlexOrderBox = styled(Box)(
  ({ theme: { breakpoints } }) => ({

    [breakpoints.down(600)]: {
      order: 0
    },
    [breakpoints.up(600)]: {
      order: 4
    },
  })
)