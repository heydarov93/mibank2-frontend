import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const StyledHeader = styled(Typography)(({ theme: { spacing } }) => ({
  fontFamily: 'Urbanist',
  fontWeight: '600',
  fontSize: spacing(2.25),
  lineHeight: spacing(3.5),
  paddingBottom: spacing(0.5),
}));

export const StyledMain = styled(Typography)(
  ({ theme: { spacing, typography, palette } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: '400',
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: typography.mediumLogo?.lineHeight,
    color: palette.grey[400],
    paddingBottom: spacing(1),
  }),
);

export const StyledProgressBar = styled(LinearProgress)(
  ({ theme: { spacing } }) => ({
    height: spacing(0.75),
    borderRadius: 5,
    '& .MuiLinearProgress-bar': {
      borderRadius: 5,
    },
  }),
);
