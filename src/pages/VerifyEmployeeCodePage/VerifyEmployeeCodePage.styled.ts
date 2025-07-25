import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledFormContainer = styled('form')(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing(1.5),
  height: '100vh',
}));

export const StyledPasswordRow = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing(1),
}));

export const StyledTitleContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '420px',
  gap: spacing(1),
  margin: spacing(3, 0),
}));

export const StyledTitle = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '32px',
    textAlign: 'center',
    color: palette.common.black,
  }),
);

export const StyledSubTitle = styled(Typography)(
  ({ theme: { typography, palette } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    fontSize: '16px',
    textAlign: 'center',
    color: palette.common.black,
    lineHeight: '24px',
  }),
);

export const StyledButtonGroup = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: spacing(1.5),
}));
