import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const StyledTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme: { palette, animations }, active }) => {
  const activeColor = active ? palette.primary.main : undefined;

  return {
    '.MuiOutlinedInput-notchedOutline': {
      border: active
        ? `2px solid ${palette.primary.main} !important`
        : undefined,
    },

    '.MuiInputBase-root': {
      'input, svg': {
        color: activeColor,
        fill: activeColor,
      },
    },

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
          border: `2px solid ${palette.primary.main}`,
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
    "& input[type='password']::-ms-reveal": {
      display: 'none',
    },
  };
});
