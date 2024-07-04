import { styled, Input, Box } from '@mui/material';

export const StyledVerificationBox = styled(Box)(
  ({ theme: { palette, spacing, animations } }) => ({
    display: 'flex',
    gap: spacing(1),
    alignItems: 'center',

    '&.shake': {
      animation: `${animations?.shake} 0.25s`,
      '&>div': {
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
  fontFamily: 'Roboto',
  fontSize: 16,
  fontWeight: 400,
  padding: spacing(2),
  borderRadius: 8,
  textAlign: 'center',
  border: `1px solid ${palette.grey[300]}`,

  '&.Mui-focused': {
    border: `2px solid ${palette.primary.main}`,
  },

  '&.hasValue': {
    border: `1px solid ${palette.primary.main}`,
  },

  ...(isCorrect && {
    color: palette.success.dark,
    border: `1px solid ${palette.success.dark}`,
    backgroundColor: `${palette.success.light}`,
    '&.hasValue': {
      border: `1px solid ${palette.success.dark}`,
    },
  }),
}));
