import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledPageWrapper = styled(Box)(
  ({ theme: { breakpoints, spacing } }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 1,
    marginTop: spacing(4),
    marginBottom: spacing(4),

    [breakpoints.down('sm')]: {
      marginTop: spacing(28),
      marginBottom: spacing(28),
    },
  }),
);

export const StyledBox = styled(Box)(({ theme: { spacing, breakpoints } }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: spacing(3),
  svg: {
    width: spacing(29),
    height: 'auto',
  },

  [breakpoints.up('sm')]: {
    svg: {
      width: spacing(40.5),
      height: 'auto',
    },
  },

  [breakpoints.up('lg')]: {
    gap: spacing(4),
    svg: {
      width: spacing(65.5),
      height: 'auto',
    },
  },
}));

export const StyledTitleContainer = styled(Box)(
  ({ theme: { spacing, breakpoints } }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing(1.5),

    [breakpoints.up('xs')]: {
      maxWidth: '80%',
    },

    [breakpoints.up('md')]: {
      maxWidth: '60%',
    },
  }),
);

export const StyledTitle = styled(Typography)(
  ({ theme: { breakpoints, palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '22px',
    color: palette.common.black,
    textAlign: 'center',
    fontWeight: 500,

    [breakpoints.up('sm')]: {
      fontSize: '28px',
    },

    [breakpoints.up('lg')]: {
      fontSize: '36px',
    },
  }),
);

export const StyledDescription = styled(Typography)(
  ({ theme: { breakpoints, palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: typography.mediumLogo?.fontSize,
    color: palette.grey[400],
    textAlign: 'center',

    [breakpoints.up('sm')]: {
      fontSize: '16px',
    },
  }),
);

export const StyledButton = styled(Button)(
  ({ theme: { breakpoints, palette, spacing } }) => ({
    fontSize: '16px',
    padding: spacing(1.25, 3),
    height: '39px',
    borderRadius: '8px',
    background: palette.primary.main,

    [breakpoints.up('xs')]: {
      maxWidth: '80%',
    },

    [breakpoints.up('sm')]: {
      height: '56px',
    },

    [breakpoints.up('md')]: {
      maxWidth: '60%',
    },

    [breakpoints.up('lg')]: {
      maxWidth: '77%',
    },
  }),
);
