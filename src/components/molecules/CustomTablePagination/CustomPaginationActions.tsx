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

import LeftArrowButton from 'components/atoms/LeftArrowButton/LeftArrowButton';
import LeftArrowEndButton from 'components/atoms/LeftArrowEndButton/LeftArrowEndButton';
import RightArrowButton from 'components/atoms/RightArrowButton/RightArrowButton';
import RightArrowEndButton from 'components/atoms/RightArrowEndButton/RightArrowEndButton';
import { getButtonColor, getTextColor } from 'utils/helpers';

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
          <LeftArrowEndButton sx={{ color: getButtonColor(isFirstPage) }} />
        </IconButton>
        <IconButton onClick={handlePreviousPage} disabled={isFirstPage}>
          <LeftArrowButton sx={{ color: getButtonColor(isFirstPage) }} />
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
          <RightArrowButton sx={{ color: getButtonColor(isLastPage) }} />
        </IconButton>
        <IconButton
          onClick={handleLastPage}
          disabled={isLastPage}
          sx={({ spacing }) => ({ marginLeft: spacing(3.5) })}
        >
          <RightArrowEndButton sx={{ color: getButtonColor(isLastPage) }} />
        </IconButton>
      </StyledNavButtonRow>
    </StyledActionsContainer>
  );
};

export default CustomPaginationActions;
