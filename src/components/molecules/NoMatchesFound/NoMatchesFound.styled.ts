import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledWhiteBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '400px',
  height: '125px',
  padding: '12px 12px 24px 12px',
  marginTop: '6px',
  borderRadius: '4px',
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.border.lightBlue}`,
  boxShadow: `0px 4px 24px 0px ${theme.palette.shadow.shadowLight}`,
  zIndex: '1111',
}));

export const StyledViewAllBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginTop: '24px',
  cursor: 'pointer',
}));

export const StyledMessageTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontFamily: theme.typography.mediumLogo?.fontFamily,
  fontWeight: 500,
  fontSize: '14px',
}));

export const StyledViewAllTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: theme.typography.mediumLogo?.fontFamily,
  fontWeight: 400,
  fontSize: '16px',
}));
