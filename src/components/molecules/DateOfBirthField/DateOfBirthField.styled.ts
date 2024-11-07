import { styled, FormHelperText } from '@mui/material';
import { DatePicker, PickersActionBar } from '@mui/x-date-pickers';

export const StyledDatePicker = styled(DatePicker, {
  shouldForwardProp: (prop) => prop !== 'hasError',
})<{ hasError: boolean }>(({ theme: { palette }, hasError }) => ({
  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-root:hover': {
      border: '3px solid red',
      outline: `1px solid ${hasError ? palette.error.main : palette.grey[300]}`,
    },
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
    },

    '&:hover:not(.Mui-focused):not(.Mui-disabled)': {
      '& .MuiOutlinedInput-notchedOutline': {
        border: `2px solid ${hasError ? palette.error.main : palette.grey[300]}`,
      },
    },
  },
  '& label': {
    color: '#bcbcbc',
    fontWeight: 300,
  },
  width: '100%',
  color: palette.grey[300],
  fontSize: '14px',
  outline: 'none',
  border: 'none',
}));

export const StyledTextButtons = styled(PickersActionBar)(
  ({ theme: { palette } }) => ({
    '& button': {
      flexBasis: '50%',
      background: palette.common.white,
      colors: palette.primary.main,
      border: `1px solid ${palette.primary.main}`,
      borderRadius: '8px',
      '&:hover': {
        color: palette.common.white,
        background: palette.primary.main,
      },
    },
  }),
);

export const StyledErrorText = styled(FormHelperText)(
  ({ theme: { palette } }) => ({
    '& .errorText': {
      marginLeft: '14px',
      color: palette.error.main,
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

export const ShakeWrapper = styled('div')(({ theme: { animations } }) => ({
  '&.shake': {
    animation: `${animations?.shake} 0.25s`,
  },
}));
