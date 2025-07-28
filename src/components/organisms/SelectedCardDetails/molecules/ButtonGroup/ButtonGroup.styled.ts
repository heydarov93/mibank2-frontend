import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const StyledButtonGroup = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: spacing(3, 0),
  gap: spacing(3),
}));

export const ButtonLayout = styled(Button)(({ theme: { spacing } }) => ({
  height: '48px',
  fontWeight: 500,
  fontSize: '14px',
  padding: spacing(1, 3),
  borderRadius: '8px',
  cursor: 'pointer',
}));

export const StyledPrimaryButton = styled(ButtonLayout)(
  ({ theme: { palette } }) => ({
    backgroundColor: palette.primary.main,
    color: palette.common.white,
    '&:hover': {
      backgroundColor: palette.primary.dark,
    },
  }),
);

export const StyledOutlinedButton = styled(ButtonLayout)(
  ({ theme: { palette } }) => ({
    color: palette.primary.main,
    borderColor: palette.primary.main,
    '&:hover': {
      borderColor: palette.primary.dark,
    },
  }),
);
