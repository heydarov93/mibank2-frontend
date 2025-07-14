import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MenuItem, SelectChangeEvent } from '@mui/material';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledItemsCountContainer,
  StyledMainContainer,
  StyledSecondaryText,
  StyledSelect,
} from './CustomPagination.styled';
import CustomPaginationActions from './CustomPaginationActions';

import { ITEMS_PER_PAGE_OPTIONS } from 'constants/business/pagination';


interface CustomTablePaginationProps {
  pageDisplayText?: string;
  totalPages: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onRowsPerPageChange: (event: SelectChangeEvent<number>) => void;
}

const CustomTablePagination = ({
  totalPages,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  pageDisplayText,
}: CustomTablePaginationProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'TablePagination',
  });

  if (totalPages === 0) {
    return null;
  }

  return (
    <StyledMainContainer data-testid="main-container">
      <StyledItemsCountContainer>
        <StyledSecondaryText>{t("itemsPerPage")}</StyledSecondaryText>
        <StyledSelect
          value={rowsPerPage}
          onChange={onRowsPerPageChange}
          IconComponent={KeyboardArrowDownIcon}
          size="small"
          data-testid="count-select"
        >
          {ITEMS_PER_PAGE_OPTIONS.map((size: number) => (
            <MenuItem key={size} value={size} data-testid="menu-item">
              <StyledSecondaryText>{size}</StyledSecondaryText>
            </MenuItem>
          ))}
        </StyledSelect>
        {pageDisplayText && (
          <StyledSecondaryText>{pageDisplayText}</StyledSecondaryText>
        )}
      </StyledItemsCountContainer>
      <CustomPaginationActions
        page={page}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        onPageChange={onPageChange}
      />
    </StyledMainContainer>
  );
};

export default CustomTablePagination;
