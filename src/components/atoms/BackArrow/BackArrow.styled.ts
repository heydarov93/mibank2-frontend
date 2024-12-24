import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledBackArrow = styled(Button)(
  ({ theme: { breakpoints, spacing, palette } }) => ({
    paddingRight: '10px',
    color: palette.common.black,
    position: 'absolute',
    top: spacing(2.5),
    left: spacing(2.5),
    fontSize: '16px',
    lineHeight: '110%',
    fontWeight: 500,
    zIndex: 1000,

    [breakpoints.down(600)]: {
      color: palette.common.white,
      top: spacing(-27),
      left: spacing(3),
    },
  }),
);
