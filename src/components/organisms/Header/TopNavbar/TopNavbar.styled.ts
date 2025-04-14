import { Box, styled, Tab, Tabs } from '@mui/material';

export const TopNavbarContainer = styled(Box)(({ theme: { palette } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 35px',
  borderBottom: `1px solid ${palette.grey[100]}`,
  backgroundColor: palette.common.white,
  boxShadow: `0px 3px 4px 0px ${palette.shadow.shadowCoolLight}`,
}));

export const LeftTabs = styled(Tabs)(({ theme: { palette } }) => ({
  '& .Mui-selected': {
    color: `${palette.common.black} !important`,
    fontWeight: 600,
  },

  '& .MuiTabs-indicator': {
    backgroundColor: palette.primary.dark,
    height: '2px',
  },
}));

export const LeftTab = styled(Tab)(({ theme: { palette, typography } }) => ({
  fontFamily: typography.mediumLogo?.fontFamily,
  fontSize: typography.mediumLogo?.fontSize,
  fontWeight: 500,
  color: palette.grey[400],
  marginRight: '25px',
  padding: '12px 16px',
  lineHeight: '100%',
  letterSpacing: 0,
}));

export const RightSection = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '24px',
}));

export const DropDownBox = styled(Box)(
  ({ theme: { palette, typography } }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '12px 5px',
    gap: '8px',
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: typography.mediumLogo?.fontSize,
    lineHeight: '100%',
    color: palette.grey[400],
    letterSpacing: 0,
    cursor: 'pointer',
  }),
);
