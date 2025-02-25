import { Box, IconButton } from '@mui/material';

import {
  PageContainer,
  SecondaryText,
} from './BackOfficeTablePagination.styled';

import LeftArrowButton from 'components/atoms/LeftArrowButton/LeftArrowButton';
import LeftArrowEndButton from 'components/atoms/LeftArrowEndButton/LeftArrowEndButton';
import RightArrowButton from 'components/atoms/RightArrowButton/RightArrowButton';
import RightArrowEndButton from 'components/atoms/RightArrowEndButton/RightArrowEndButton';
import { theme } from 'theme/theme';

interface PaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
}

const CustomPaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: PaginationActionsProps) => {
  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={(e) => onPageChange(e, 0)} disabled={page === 0}>
          <LeftArrowEndButton
            sx={{
              color:
                page === 0
                  ? theme.palette.grey[300]
                  : theme.palette.common.black,
            }}
          />
        </IconButton>
        <IconButton
          onClick={(e) => onPageChange(e, page - 1)}
          disabled={page === 0}
        >
          <LeftArrowButton
            sx={{
              color:
                page === 0
                  ? theme.palette.grey[300]
                  : theme.palette.common.black,
            }}
          />
        </IconButton>
        <SecondaryText
          sx={{
            color:
              page === 0 ? theme.palette.grey[300] : theme.palette.common.black,
          }}
        >
          Previous
        </SecondaryText>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <PageContainer>
          <SecondaryText>{page + 1}</SecondaryText>
        </PageContainer>
        <SecondaryText>of {totalPages}</SecondaryText>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SecondaryText
          sx={{
            color:
              page >= totalPages - 1
                ? theme.palette.grey[100]
                : theme.palette.common.black,
          }}
        >
          Next
        </SecondaryText>
        <IconButton
          onClick={(e) => onPageChange(e, page + 1)}
          disabled={page >= totalPages - 1}
        >
          <RightArrowButton
            sx={{
              color:
                page >= totalPages - 1
                  ? theme.palette.grey[100]
                  : theme.palette.common.black,
            }}
          />
        </IconButton>
        <IconButton
          onClick={(e) => onPageChange(e, totalPages - 1)}
          disabled={page >= totalPages - 1}
        >
          <RightArrowEndButton
            sx={{
              color:
                page >= totalPages - 1
                  ? theme.palette.grey[100]
                  : theme.palette.common.black,
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomPaginationActions;
