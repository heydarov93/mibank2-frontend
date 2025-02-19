import { styled, TextField } from '@mui/material';

export const StyledSearchField = styled(TextField)(
  ({ theme: { palette } }) => ({
    height: '100%',
    '& .MuiInputBase-root': {
      height: '100%',
      alignItems: 'center',
    },
    '& .MuiOutlinedInput-root': {
      height: '100%',
      paddingRight: 0,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
    boxShadow: `0px 1px 10px 0px ${palette.primary.main}33`,
    borderRadius: '4px',
  }),
);
