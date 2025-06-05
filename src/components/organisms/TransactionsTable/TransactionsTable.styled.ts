import {
  Box,
  styled,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
} from '@mui/material';

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

export const StyledEmptyStateContainer = styled(Typography)(
  ({ theme: { spacing } }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing(10, 5),
  }),
);
