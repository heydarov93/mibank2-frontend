import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

export const StyledTableRow = styled(TableRow)(({ theme: { palette } }) => ({
  borderBottom: `1px solid ${palette.border.lightBlue}`,
  '&:hover': {
    backgroundColor: palette.bg.lightBlue,
  },
}));

export const StyledTableCell = styled(TableCell)(
  ({ theme: { palette, typography, spacing } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 400,
    lineHeight: '24px',
    padding: spacing(1.5, 2),
    fontSize: '16px',
    color: palette.common.black,
  }),
);

export const StyledAmountText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'positive' && prop !== 'income',
})<{ income?: boolean }>(({ income, theme: { palette } }) => ({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  color: income ? palette.success.main : palette.error.main,
}));
