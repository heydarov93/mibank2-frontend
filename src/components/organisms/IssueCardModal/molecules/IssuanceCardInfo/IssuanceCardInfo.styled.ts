import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[400],
  fontSize: 14,
  width: '50%',
}));
