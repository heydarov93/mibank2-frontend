import {
  FirstPageRounded,
  LastPageRounded,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from '@mui/icons-material'; // order matters
import { IconButton } from '@mui/material';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledActionsContainer,
  StyledNavButtonRow,
  StyledPageCountContainer,
  StyledPageCountIndicator,
  StyledSecondaryText,
} from './CustomPagination.styled';
import { getButtonColor, getTextColor } from './utils/colorUtils';

interface PaginationActionsProps {
  totalPages: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
}

const CustomPaginationActions = ({
  totalPages,
  page,
  onPageChange,
}: PaginationActionsProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'TablePagination',
  });
  const isFirstPage = page === 0;
  const isLastPage = page >= totalPages - 1;

  const handleFirstPage = (e: MouseEvent<HTMLButtonElement>) => {
    onPageChange(e, 0);
  };

  const handlePreviousPage = (e: MouseEvent<HTMLButtonElement>) => {
    onPageChange(e, Math.max(0, page - 1));
  };

  const handleNextPage = (e: MouseEvent<HTMLButtonElement>) => {
    onPageChange(e, Math.min(totalPages - 1, page + 1));
  };

  const handleLastPage = (e: MouseEvent<HTMLButtonElement>) => {
    onPageChange(e, totalPages - 1);
  };

  return (
    <StyledActionsContainer data-testid="pagination-actions">
      <StyledNavButtonRow>
        <IconButton
          onClick={handleFirstPage}
          disabled={isFirstPage}
          sx={({ spacing }) => ({ marginRight: spacing(3.5) })}
        >
          <FirstPageRounded sx={{ color: getButtonColor(isFirstPage) }} />
        </IconButton>
        <IconButton onClick={handlePreviousPage} disabled={isFirstPage}>
          <KeyboardArrowLeftRounded
            sx={{ color: getButtonColor(isFirstPage) }}
          />
        </IconButton>
        <StyledSecondaryText sx={{ color: getTextColor(isFirstPage) }}>
          {t('prevBtn')}
        </StyledSecondaryText>
      </StyledNavButtonRow>

      <StyledPageCountIndicator>
        <StyledPageCountContainer data-testid="current-page">
          <StyledSecondaryText>{page + 1}</StyledSecondaryText>
        </StyledPageCountContainer>
        <StyledSecondaryText>of {totalPages}</StyledSecondaryText>
      </StyledPageCountIndicator>

      <StyledNavButtonRow>
        <StyledSecondaryText sx={{ color: getTextColor(isLastPage) }}>
          {t('nextBtn')}
        </StyledSecondaryText>
        <IconButton onClick={handleNextPage} disabled={isLastPage}>
          <KeyboardArrowRightRounded
            sx={{ color: getButtonColor(isLastPage) }}
          />
        </IconButton>
        <IconButton
          onClick={handleLastPage}
          disabled={isLastPage}
          sx={({ spacing }) => ({ marginLeft: spacing(3.5) })}
        >
          <LastPageRounded sx={{ color: getButtonColor(isLastPage) }} />
        </IconButton>
      </StyledNavButtonRow>
    </StyledActionsContainer>
  );
};

export default CustomPaginationActions;
