import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)(({ theme: { palette } }) => ({
  whiteSpace: 'break-spaces',
  maxWidth: '415px',
  fontSize: '16px',
  padding: '32px 40px',
  color: palette.common.black,
  backgroundColor: palette.common.white,
  border: `1px solid ${palette.primary.main}`,
  borderRadius: '8px',
  boxShadow: `0 4px 24px 0 ${palette.shadow.shadowLight}`,
  flexWrap: 'nowrap',
}));
