import { Chip, Stack, styled } from '@mui/material';

export const StyledValidationTagContainer = styled(Stack)(() => ({
  display: 'inline-flex',
  margin: 1.5,
  marginRight: 2.5,
  alignItems: 'center',
}));

export const StyledValidationTag = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'isValidated' && prop !== 'isSpecial',
})<{ isValidated: boolean; isSpecial: boolean }>(
  ({ isValidated, isSpecial, theme }) => ({
    backgroundColor: isValidated
      ? theme.palette.primary.light
      : theme.palette.error.light,
    color: 'black',
    padding: '12px 0px',
    fontSize: '10px',
    height: '10px',
    borderRadius: 8,
    paddingRight: isSpecial ? 18 : 0,

    '& .MuiChip-icon': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      marginLeft: '8px',
    },
  }),
);
