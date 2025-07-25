import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const StyledName = styled(Typography)(({ theme: { palette } }) => ({
  color: palette.grey[400],
}));
