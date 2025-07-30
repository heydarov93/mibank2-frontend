import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledAppContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}));

export const StyledOutletContainer = styled('div')(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'row',
    gap: spacing(5),
    marginBlock: spacing(4),
    paddingInline: spacing(4),
    marginInline: 'auto',
    width: '100%',
    minWidth: '1440px',
    maxWidth: '1920px',

    '& > :first-child': {
      maxWidth: '385px',
    },
  }),
);
