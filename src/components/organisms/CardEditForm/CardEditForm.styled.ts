import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const MainContainer = styled(Box)(({ theme: { spacing, palette } }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(5),
  padding: spacing(5),
  borderRadius: spacing(1),
  backgroundColor: palette.common.white,
  position: 'absolute',
  top: '96px',
  left: '270px',
  minWidth: '500px',
  overflowY: 'auto',
  maxHeight: '800px',
  border: `1px solid ${palette.grey[100]}`,
}));

export const MainHeader = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: '26px',
    color: palette.common.black,
    fontWeight: '600',
  }),
);

export const FormLabel = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: typography.mediumLogo?.fontSize,
    color: palette.common.black,
    fontWeight: '500',
  }),
);
