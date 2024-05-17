import { styled, TextField, keyframes, Typography, Box } from '@mui/material';

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
}));

export const StyledForm = styled('form')(({ theme: { breakpoints } }) => ({
  width: 345,

  [breakpoints.up('sm')]: {
    width: 680,
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

export const StyledFormTitle = styled(Typography)(({ theme: { spacing } }) => ({
  marginTop: spacing(6),
  marginBottom: spacing(3),

  fontSize: 20,
  fontWeight: 500,
}));

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
    paddingTop: spacing(1.5),
  }),
);

export const AgreementContainer = styled(Typography)(
  ({ theme: { breakpoints, spacing } }) => ({
    paddingTop: spacing(2),
    lineHeight: '16px',
    fontWeight: 500,

    [breakpoints.up('sm')]: {
      paddingTop: spacing(0),
    },
  }),
);

export const StyledButtonContainer = styled(Box)(({ theme: { spacing } }) => ({
  paddingTop: spacing(3),
}));
