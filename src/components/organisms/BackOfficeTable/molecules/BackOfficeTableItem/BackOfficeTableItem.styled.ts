import { styled, TableCell } from '@mui/material';

export const StyledTableCell = styled(TableCell)(
  ({ theme: { typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontSize: typography.mediumLogo?.fontSize,
    fontWeight: 500,
  }),
);
