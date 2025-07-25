import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)(({ theme: { spacing } }) => ({
  padding: spacing(1.75, 3),
}));
