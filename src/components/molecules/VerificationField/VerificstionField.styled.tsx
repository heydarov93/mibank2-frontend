import { styled, Input } from '@mui/material';

export const StyledInputElement = styled(Input)(
  ({ theme: { palette, spacing } }) => ({
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
  }),
);
