import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const StyledCountrySelectField = styled(TextField)(
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

      '&.Mui-disabled': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.grey[300],
        },
        '&:hover': {
          '& .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${palette.grey[300]}`,
          },
        },
      },

      '&:hover:not(.Mui-focused):not(.Mui-disabled)': {
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
