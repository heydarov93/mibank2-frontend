import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)(
  ({ theme: { palette, spacing } }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing(0, 4),
    borderBottom: `1px solid ${palette.grey[100]}`,
    backgroundColor: palette.common.white,
    boxShadow: `0px 3px 4px 0px ${palette.shadow.shadowCoolLight}`,
  }),
);

export const StyledTabs = styled(Tabs)(({ theme: { palette } }) => ({
  '& .Mui-selected': {
    color: `${palette.common.black} !important`,
    fontWeight: 600,
  },

  '& .MuiTabs-indicator': {
    backgroundColor: palette.primary.dark,
    height: '2px',
  },
}));

export const StyledTab = styled(Tab)(
  ({ theme: { palette, typography, spacing } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: typography.mediumLogo?.fontSize,
    fontWeight: 500,
    color: palette.grey[400],
    marginRight: spacing(3),
    padding: spacing(1, 2),
    lineHeight: '100%',
    letterSpacing: 0,
  }),
);

export const StyledRightSection = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: spacing(3),
}));

export const StyledContactsText = styled(Typography)(
  ({ theme: { palette, typography, spacing } }) => ({
    color: palette.grey[400],
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '100%',
    padding: spacing(1.5, 1.25),
    cursor: 'pointer',
    letterSpacing: 0,
  }),
);

export const StyledLangText = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    color: palette.grey[400],
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '100%',
    letterSpacing: 0,
  }),
);

export const DropDownBox = styled(Box)(
  ({ theme: { palette, typography, spacing } }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: spacing(1.5, 1.25),
    gap: spacing(1),
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '100%',
    color: palette.grey[400],
    letterSpacing: 0,
    cursor: 'pointer',
  }),
);
