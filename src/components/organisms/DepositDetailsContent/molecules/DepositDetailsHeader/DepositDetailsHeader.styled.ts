import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const StyledBackButton = styled(Button)(({ theme: { palette } }) => ({
  position: 'absolute',
  top: '8px',
  left: '72px',
  paddingInline: '16px',
  color: palette.common.black,
}));

export const StyledBackArrowIcon = styled(ArrowBackIcon)(
  ({ theme: { palette } }) => ({
    width: '19px',
    height: '19px',
    color: palette.common.black,
  }),
);
