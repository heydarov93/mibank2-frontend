import { styled, TextField } from '@mui/material';

export const StyledTextField = styled(TextField)(
  ({ theme: { palette, animations } }) => ({
    '&.shake': {
      animation: `${animations?.shake} 0.25s`,
    },

    '& .MuiFormHelperText-root': {
      color: palette.error.main,
      display: 'flex',
      flexDirection: 'column',
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

    '& .MuiOutlinedInput-input': {
      '&:-webkit-autofill': {
        WebkitBackgroundClip: 'text',
      },
    },
  }),
);
