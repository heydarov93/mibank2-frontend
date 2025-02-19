import { styled, TableCell, TableHead, TableRow } from '@mui/material';

export const StyledTableHead = styled(TableHead)(({ theme: { palette } }) => ({
  backgroundColor: palette.primary.light,
  border: `1px solid ${palette.grey[100]}`,
}));

export const StyledTableRow = styled(TableRow)(({ theme: { palette } }) => ({
  border: `1px solid ${palette.grey[100]}`,
}));

export const StyledTableCell = styled(TableCell)(() => ({
  padding: '12px',
}));
