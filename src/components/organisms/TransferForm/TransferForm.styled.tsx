import { Box, ButtonBase, Icon, styled } from '@mui/material';

export const StyledForm = styled('form')(() => ({
  marginTop: '32px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'repeat(4, min-content)',
  rowGap: '12px',
  columnGap: '40px',

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

export const StyledButtonsContainer = styled(Box)(() => ({
  justifySelf: 'end',
  display: 'flex',
  marginTop: '16px',
  gap: '16px',
}));

export const StyledArrowIcon = styled(Icon)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'end',
  padding: '20px',

  position: 'absolute',
  top: 0,
  left: 0,
  translate: '-100% 74%',

  gridColumn: 2,
  gridRow: 1,
}));

// AutocompleteField
export const StyledOptionContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

export const StyledButton = styled(ButtonBase)(() => ({
  display: 'flex',
  gap: '5px',
  alignItems: 'center',
  padding: '8px',
  paddingRight: 0,
}));
