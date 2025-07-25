import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.lightBlue}`,
  boxShadow: `0px 4px 24px 0px ${theme.palette.shadow.shadowLight}`,
  borderRadius: '8px',
}));

export const StyledTitle = styled(Typography)(
  ({ theme: { spacing, palette } }) => ({
    color: palette.common.black,
    fontFamily: 'Urbanist',
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '28px',
    marginBottom: spacing(1.75),
  }),
);

export const StyledHeadCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.grey[400],
  fontFamily: theme.typography.mediumLogo?.fontFamily,
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
}));

export const StyledCellText = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontFamily: theme.typography.mediumLogo?.fontFamily,
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
}));

export const TrendingUpIcon = styled(TrendingUpRoundedIcon)(
  ({ theme: { palette, spacing } }) => ({
    marginRight: spacing(1),
    width: '18px',
    height: '18px',
    color: palette.success.main,
  }),
);

export const TrendingDownIcon = styled(TrendingDownRoundedIcon)(
  ({ theme: { palette, spacing } }) => ({
    marginRight: spacing(1),
    width: '18px',
    height: '18px',
    color: palette.error.main,
  }),
);

export const CellBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));
