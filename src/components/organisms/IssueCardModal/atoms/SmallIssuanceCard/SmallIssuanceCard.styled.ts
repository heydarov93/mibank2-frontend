import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const CardWrapper = styled(Box, {
  shouldForwardProp: (p) => p !== 'background',
})<{
  selected?: boolean;
  background: string;
}>(({ theme, selected, background }) => ({
  borderRadius: '8px',
  background,
  color: theme.palette.common.white,
  flexShrink: 0,
  width: '128px',
  height: '84px',
  padding: '12px',
  cursor: 'pointer',
  ...(selected && {
    width: '148px',
    height: 'auto',
    minHeight: '92px',
  }),
}));
