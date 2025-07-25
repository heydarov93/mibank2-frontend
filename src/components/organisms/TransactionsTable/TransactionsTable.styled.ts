import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Box)(() => ({
  display: 'flex',
  flex: 3,
  flexDirection: 'column',
  justifyContent: 'flex-start',
}));

export const StyledTableContainer = styled(TableContainer)(
  ({ theme: { palette } }) => ({
    backgroundColor: palette.common.white,
    borderRadius: '12px',
    boxShadow: `0px 4px 20px ${palette.shadow.shadowLight}`,
    border: `1px solid ${palette.border.lightBlue}`,
    overflow: 'hidden',
  }),
);

export const StyledTableHead = styled(TableHead)(({ theme: { palette } }) => ({
  backgroundColor: palette.bg.lightBlue,
}));

export const StyledHeaderCell = styled(TableCell)(
  ({ theme: { palette, typography } }) => ({
    color: palette.common.black,
    fontFamily: typography.mediumLogo?.fontFamily,
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '100%',
    textAlign: 'start',
  }),
);

export const StyledTableTitle = styled(Typography)(
  ({ theme: { palette, spacing } }) => ({
    fontFamily: 'Urbanist',
    color: palette.common.black,
    lineHeight: '125%',
    fontWeight: 600,
    fontSize: '26px',
    marginBottom: spacing(3),
  }),
);

export const StyledEmptyStateContent = styled(Typography)(
  ({ theme: { palette, typography } }) => ({
    fontFamily: typography.mediumLogo?.fontFamily,
    color: palette.common.black,
    lineHeight: '24px',
    fontWeight: 400,
    fontSize: '16px',
    textAlign: 'center',
  }),
);

export const StyledEmptyStateContainer = styled(Box)(
  ({ theme: { spacing } }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing(10, 5),
  }),
);

export const StyledEmptyTableCell = styled(TableCell)({
  padding: 0,
});

export const StyledLoadingSpinnerWrapper = styled(Box)({
  flexGrow: 1,
});

export const StyledSortIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.black,
  backgroundColor: 'transparent',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));
