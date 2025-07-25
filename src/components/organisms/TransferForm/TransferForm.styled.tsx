import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import { styled } from "@mui/material/styles";

export const StyledForm = styled('form')(({ theme: { spacing } }) => ({
  fontSize: '14px',
  marginTop: spacing(4),
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'repeat(4, min-content)',
  rowGap: spacing(2),
  columnGap: spacing(5),

  position: 'relative',

  maxWidth: '1000px',
  marginInline: 'auto',
}));

export const StyledLabel = styled('label')(() => ({
  display: 'inline-block',
  width: '100%',
  fontWeight: 500,
  minWidth: '200px',
}));

export const StyledButtonsContainer = styled(Box)(({ theme: { spacing } }) => ({
  justifySelf: 'end',
  display: 'flex',
  marginTop: spacing(2),
  gap: spacing(2),
}));

export const StyledArrowIcon = styled(Icon)(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'end',
  padding: spacing(2.5),

  position: 'absolute',
  top: 0,
  left: 0,
  translate: '-100% 74%',

  gridColumn: 2,
  gridRow: 1,
}));
