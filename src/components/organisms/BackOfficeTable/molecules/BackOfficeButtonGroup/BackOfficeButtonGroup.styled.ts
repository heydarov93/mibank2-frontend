import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)(({ theme: { typography } }) => ({
  padding: '6px 8px',
  border: '1px solid',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  gap: '4px',
  cursor: 'pointer',
  fontSize: typography.mediumLogo?.fontSize,
  fontFamily: typography.mediumLogo?.fontFamily,
  fontWeight: '500',
}));
