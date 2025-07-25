import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";


export const StyledContainer = styled(Box)(
  ({ theme: { animations, spacing } }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing(1),
    padding: spacing(1.5, 1.5, 1.5, 0),

    '&.shake': {
      animation: `${animations?.shake} 0.25s`,
    },
  }),
);

export const AgreementContainer = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'disabled' && prop !== 'hasError',
})<{ disabled: boolean; hasError: boolean }>(
  ({ theme, disabled, hasError }) => ({
    lineHeight: '16px',
    letterSpacing: 0.5,
    fontWeight: 400,

    color: hasError
      ? theme.palette.error.main
      : disabled
        ? theme.palette.grey[300]
        : theme.palette.common.black,

    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(0),
    },
  }),
);
