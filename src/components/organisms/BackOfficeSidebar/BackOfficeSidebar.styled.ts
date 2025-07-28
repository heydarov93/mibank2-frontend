import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledHeader = styled(Typography)(({ theme }) => ({
  fontSize: '26px',
  color: theme.palette.grey[300],
  fontFamily: 'Urbanist',
}));

export const ProductsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
}));
