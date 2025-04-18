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
    boxShadow: `2px 2px 8px 0px ${palette.primary.main}33`,
    borderRadius: '4px',
  }),
);
