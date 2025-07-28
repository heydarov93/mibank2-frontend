import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { styled } from "@mui/material/styles";

export const StyledTabs = styled(Tabs)(({ theme: { palette } }) => ({
  minHeight: 0,
  '& .MuiTabs-flexContainer': {
    borderBottom: `1px solid ${palette.grey[300]}`,
  },
}));

export const StyledTab = styled(Tab)(({ theme: { spacing } }) => ({
  fontFamily: 'Inter',
  fontSize: '16px',
  fontWeight: 500,
  padding: spacing(1, 2),
  minHeight: 0,
}));
