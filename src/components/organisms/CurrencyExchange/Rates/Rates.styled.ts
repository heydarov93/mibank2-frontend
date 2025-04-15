import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import {
  Box,
  styled,
  TableCell,
  TableContainer,
  Typography,
} from '@mui/material';

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  border: `1px solid ${theme.palette.border.lightBlue}`,
  boxShadow: `0px 4px 24px 0px ${theme.palette.shadow.shadowLight}`,
  borderRadius: '8px',
}));

export const StyledTableTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontFamily: theme.typography.mediumLogo?.fontFamily,
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '28px',
  marginBottom: '14px',
}));

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
  ({ theme: { palette } }) => ({
    marginRight: '8px',
    width: '18px',
    height: '18px',
    color: palette.success.main,
  }),
);

export const TrendingDownIcon = styled(TrendingDownRoundedIcon)(
  ({ theme: { palette } }) => ({
    marginRight: '8px',
    width: '18px',
    height: '18px',
    color: palette.error.main,
  }),
);

export const CellBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));
