import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

export const StyledPersonalMenu = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: spacing(1),
}));

export const StyledButtonsContainer = styled(Box)(
  ({ theme: { breakpoints, spacing } }) => ({
    display: 'none',
    gap: spacing(2),

    [breakpoints.up('md')]: {
      display: 'flex',
    },
  }),
);

export const StyledIconButton = styled(IconButton)(
  ({ theme: { palette } }) => ({
    padding: 0,
    color: palette.grey[400],
  }),
);
