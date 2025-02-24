import { SelectChangeEvent, Box, MenuItem } from '@mui/material';

import {
  MainContainer,
  SecondaryText,
  StyledSelect,
} from './BackOfficeTablePagination.styled';
import CustomPaginationActions from './CustomPaginationActions';

interface CustomTablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onRowsPerPageChange: (event: SelectChangeEvent<number>) => void;
}

const CustomTablePagination = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: CustomTablePaginationProps) => {
  return (
    <MainContainer>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <SecondaryText>Items per page</SecondaryText>
        <StyledSelect
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
          size="small"
        >
          {[10, 20].map((size) => (
            <MenuItem key={size} value={size}>
              <SecondaryText>{size}</SecondaryText>
            </MenuItem>
          ))}
        </StyledSelect>
        <SecondaryText>
          {page * rowsPerPage + 1} - {Math.min(count, (page + 1) * rowsPerPage)}{' '}
          of {count} items
        </SecondaryText>
      </Box>
      <CustomPaginationActions
        count={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
      />
    </MainContainer>
  );
};

export default CustomTablePagination;
