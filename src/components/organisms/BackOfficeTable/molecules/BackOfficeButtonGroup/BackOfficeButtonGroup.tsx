import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { StyledButton } from './BackOfficeButtonGroup.styled';

import { PenIcon, TrashIcon } from 'components/atoms';
import { TableData } from 'models/ITableData';
import { theme } from 'theme/theme';

interface BackOfficeButtonGroupProps {
  isDisabled: boolean;
  onDeleteClick?: (product: Partial<TableData>) => void;
  onEditClick?: (product: Partial<TableData>) => void;
  product: Partial<TableData>;
}

export const BackOfficeButtonGroup = ({
  isDisabled,
  onDeleteClick,
  onEditClick,
  product,
}: BackOfficeButtonGroupProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  const handleEditClick = () => {
    if (onEditClick && product) {
      onEditClick(product);
    }
  };

  const handleDeleteClick = () => {
    if (onDeleteClick && product) {
      onDeleteClick(product);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: '8px' }}>
      <StyledButton
        onClick={handleEditClick}
        sx={{
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
        }}
        disabled={isDisabled}
      >
        <PenIcon sx={{ color: isDisabled ? theme.palette.grey[300] : '' }} />
        {t('LastResortDeposit.edit')}
      </StyledButton>
      <StyledButton
        onClick={handleDeleteClick}
        sx={{
          color: theme.palette.error.main,
          backgroundColor: theme.palette.error.light,
        }}
        disabled={isDisabled}
      >
        <TrashIcon sx={{ color: isDisabled ? theme.palette.grey[300] : '' }} />
        {t('LastResortDeposit.delete')}
      </StyledButton>
    </Box>
  );
};
