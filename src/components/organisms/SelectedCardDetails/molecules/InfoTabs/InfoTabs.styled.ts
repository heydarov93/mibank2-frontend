import { styled, Tab, Tabs } from "@mui/material";

export const StyledTabs = styled(Tabs)(({ theme: { spacing, palette } }) => ({
  marginBottom: spacing(4),

  '.MuiTabs-indicator': {
    backgroundColor: palette.primary.main,
    height: '2px',
  },

  '.MuiTabs-flexContainer': {
    borderBottom: `1px solid ${palette.grey[400]}`,
  },
}));

export const StyledTab = styled(Tab)(({ theme: { spacing, palette } }) => ({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '100%',
  color: palette.grey[500],
  padding: spacing(1, 3),
  width: '100%',
  minWidth: '300px',
  maxWidth: '300px',

  '&.Mui-selected': {
    color: palette.primary.main,
    fontWeight: 500,
  },

  '&:hover': {
    color: palette.primary.main,
  },
}));
