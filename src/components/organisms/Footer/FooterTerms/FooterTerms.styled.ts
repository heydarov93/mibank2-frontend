import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBottomBox = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    textDecoration: 'none',
    color: palette.grey[400],
    paddingTop: spacing(3),
  }),
);

export const StyledBox = styled(Box)(({ theme: { palette, breakpoints } }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  [breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
  [breakpoints.up('md')]: {
    flexDirection: 'row',
  },
  justifyContent: 'space-between',
  borderTop: `1px solid ${palette.grey[50]}`,
}));
