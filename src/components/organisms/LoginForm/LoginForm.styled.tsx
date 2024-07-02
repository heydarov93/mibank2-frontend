import {
  styled,
  TextField,
  keyframes,
  Typography,
  Box,
  Link,
} from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

const shakeAnimation = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  50% { transform: translateX(5px); }
  75% { transform: translateX(-5px); }
  100% { transform: translateX(0); }
`;

export const StyledBoxContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 768,
}));

export const StyledForm = styled('form')(({ theme: { breakpoints } }) => ({
  width: 345,

  [breakpoints.up('sm')]: {
    width: 680,
  },

  [breakpoints.up('md')]: {
    width: 575,
  },
}));

export const StyledFormContent = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: spacing(2),
}));

export const StyledLable = styled('label')(({ theme: { palette } }) => ({
  color: palette.common.black,
  fontSize: 14,
  lineHeight: '20px',
  fontWeight: 500,
}));

export const StyledFormTitle = styled(Typography)(
  ({ theme: { spacing, breakpoints } }) => ({
    marginTop: spacing(6),
    marginBottom: spacing(3),
    fontSize: 20,
    fontWeight: 500,

    [breakpoints.up('sm')]: {
      marginTop: spacing(5),
      marginBottom: spacing(2),
      fontSize: 32,
      fontWeight: 400,
    },

    [breakpoints.up('md')]: {
      marginTop: '18px',
    },
  }),
);

export const StyledErrorHint = styled(Box)(
  ({ theme: { spacing, palette } }) => ({
    color: palette.common.black,
    paddingLeft: spacing(0.5),
    display: 'flex',
    alignItems: 'center',

    '& svg': {
      width: 16,
      height: 16,
    },
  }),
);

export const BootstrapTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ),
)(({ theme: { breakpoints, palette, spacing } }) => {
  return {
    '& .MuiTooltip-tooltip': {
      backgroundColor: palette.grey[400],
      width: 255,
      maxWidth: 500,
      fontSize: 10,
      lineHeight: '14px',
      fontWeight: 500,
      margin: `0 ${spacing(1)} !important`,

      padding: `${spacing(0.5)} ${spacing(1)}`,

      [breakpoints.up('sm')]: {
        width: 350,
      },
    },

    '&.MuiTooltip-touch': {
      padding: `${spacing(0.5)} ${spacing(1)}`,
    },
  };
});

export const StyledTextField = styled(TextField)(({ theme: { palette } }) => ({
  '&.shake': {
    animation: `${shakeAnimation} 0.25s`,
  },

  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: 8,
      border: `1px solid ${palette.grey[300]}`,
    },

    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'secondary.main',
      },
    },

    '&:hover:not(.Mui-focused)': {
      '& .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${palette.grey[400]}`,
      },
    },
  },
}));

export const CheckboxStyledContainer = styled(Box)(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    paddingTop: spacing(2),

    '&.shake': {
      animation: `${shakeAnimation} 0.25s`,
    },
  }),
);

export const AgreementContainer = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'disabled' && prop !== 'hasError',
})<{ disabled: boolean; hasError: boolean }>(
  ({ theme, disabled, hasError }) => ({
    paddingTop: theme.spacing(2),
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

export const StyledButtonContainer = styled(Box)(
  ({ theme: { breakpoints, spacing } }) => ({
    paddingTop: spacing(3),

    [breakpoints.up('sm')]: {
      paddingTop: spacing(2),
    },
  }),
);

export const StyledSignUpLinkContainer = styled(Box)(
  ({ theme: { breakpoints, palette } }) => ({
    display: 'flex',
    paddingTop: 39,
    fontSize: 16,
    fontWeight: 400,
    color: palette.common.black,

    [breakpoints.up('sm')]: {
      paddingTop: 31,
    },
  }),
);

export const StyledSignUpLink = styled(Link)(({ theme }) => ({
  paddingLeft: 8,
  fontWeight: 500,
  textDecoration: 'none',
  color: theme.palette.primary.main,
}));
