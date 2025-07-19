import { styled, Input, Box, Typography } from '@mui/material';

export const StyledBoxContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  marginTop: 2,
}));

export const StyledVerificationBox = styled(Box)(
  ({ theme: { palette, spacing, animations } }) => ({
    display: 'flex',
    gap: spacing(1),
    alignItems: 'center',

    '&.shake': {
      animation: `${animations?.shake} 0.25s`,
      '&>div': {
        color: `${palette.error.main}`,
        border: `1px solid ${palette.error.main}`,
        backgroundColor: `${palette.error.light}`,
      },
    },
  }),
);

export const StyledInputElement = styled(Input, {
  shouldForwardProp: (prop) => prop !== 'isCorrect',
})<{ isCorrect: boolean }>(({ theme: { palette, spacing }, isCorrect }) => ({
  width: 46,
  height: 50,
  fontSize: 16,
  fontWeight: 400,
  padding: spacing(2),
  borderRadius: 8,
  textAlign: 'center',
  border: `1px solid ${palette.grey[300]}`,
  caretColor: 'transparent',

  '&.Mui-disabled>input::placeholder': {
    color: `${palette.grey[300]}`,
    WebkitTextFillColor: `${palette.grey[300]}`,
  },

  '&>input::placeholder': {
    color: `${palette.grey[300]}`,
  },

  '&.hasValue': {
    border: `1px solid ${palette.primary.main}`,
  },

  '&.Mui-focused': {
    border: `2px solid ${palette.primary.main}`,
  },

  ...(isCorrect && {
    color: palette.primary.dark,
    border: `1px solid ${palette.primary.dark}`,
    backgroundColor: `${palette.primary.light}`,
    '&.hasValue': {
      border: `1px solid ${palette.primary.dark}`,
    },
  }),
}));

export const StyledTypography = styled(Typography)(
  ({ theme: { spacing, palette } }) => ({
    color: palette.error.main,
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
    lineHeight: spacing(2),
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
  }),
);
