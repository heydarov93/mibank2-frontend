import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";

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
