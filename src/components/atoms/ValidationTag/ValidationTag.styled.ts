import { Chip, Stack, styled } from '@mui/material';

export const StyledValidationTagContainer = styled(Stack)(() => ({
  display: 'inline-block',
  margin: 1.5,
  marginRight: 2.5,
}));

export const StyledValidationTag = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'isValidated',
})<{ isValidated: boolean }>(({ isValidated, theme }) => ({
  backgroundColor: isValidated
    ? theme.palette.primary.light
    : theme.palette.error.light,
  color: 'black',
  padding: '12px 0px',
  fontSize: '10px',
  height: '10px',
  borderRadius: 8,

  '& .MuiChip-icon': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    marginLeft: '8px',
  },
}));
