import { styled } from '@mui/material';
import { DatePicker, PickersActionBar } from '@mui/x-date-pickers';

export const StyledDatePicker = styled(DatePicker)(
  ({ theme: { palette } }) => ({
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
      input: {
        WebkitTextFillColor: palette.common.black,
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
    width: '100%',
    color: palette.grey[300],
    fontSize: '14px',
    outline: 'none',
    border: 'none',
  }),
);

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
