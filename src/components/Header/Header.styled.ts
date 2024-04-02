import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledHeader = styled('header')(
  ({ theme: { palette, spacing } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: palette.common.white,
    padding: spacing(3, 4),
    boxShadow: `0px 2px 8px 0px #D3D9E9`,
  }),
);

export const StyledHeaderContent = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));
