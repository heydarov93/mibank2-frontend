import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { StyledButton } from './BackOfficeButtonGroup.styled';

import PenIcon from 'components/atoms/PenIcon/PenIcon';
import TrashIcon from 'components/atoms/TrashIcon/TrashIcon';
import { theme } from 'theme/theme';

interface BackOfficeButtonGroupProps {
  isDisabled: boolean;
  onDeleteClick?: () => void;
  onEditClick?: () => void;
}

const BackOfficeButtonGroup = ({
  isDisabled,
  onDeleteClick,
  onEditClick,
}: BackOfficeButtonGroupProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  return (
    <Box sx={{ display: 'flex', gap: '8px' }}>
      <StyledButton
        onClick={onEditClick}
        sx={{
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.primary.light,
        }}
        disabled={isDisabled}
      >
        <PenIcon />
        {t('LastResortDeposit.edit')}
      </StyledButton>
      <StyledButton
        onClick={onDeleteClick}
        sx={{
          color: theme.palette.error.main,
          backgroundColor: theme.palette.error.light,
        }}
        disabled={isDisabled}
      >
        <TrashIcon />
        {t('LastResortDeposit.delete')}
      </StyledButton>
    </Box>
  );
};

export default BackOfficeButtonGroup;
