import Alert from "@mui/material/Alert";
import { styled } from "@mui/material/styles";

export const StyledAlert = styled(Alert)(({ theme: { palette } }) => ({
  width: '100%',
  padding: '32px',
  borderRadius: '8px',
  backgroundColor: palette.common.white,
  boxShadow: `0 4px 24px 0 ${palette.shadow.shadowLight}`,
  '.MuiAlert-message': { paddingTop: 0 },
  '.MuiAlert-icon': { paddingTop: 0 },
  '.MuiAlert-action': { paddingTop: 0 },
}));
