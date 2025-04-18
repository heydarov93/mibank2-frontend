import {
  Box,
  Button,
  CircularProgress,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { TableData } from '../BackOfficeTableItem/BackOfficeTableItem';

import {
  MainContainer,
  MainHeader,
  ProductName,
  SecondaryHeader,
  StyledBox,
} from './BackOfficeWarningWindow.styled';

import { BackOfficeWarningIcon } from 'components/atoms';
import { theme } from 'theme/theme';

interface BackOfficeWarningWindowProps {
  product?: Partial<TableData>;
  employee?: Partial<TableData>;
  sx?: SxProps<Theme>;
  onDeleteClick?: (product: Partial<TableData> | undefined) => void;
  onCancelClick: () => void;
  title?: string;
  text?: string;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export const BackOfficeWarningWindow = ({
  product,
  employee,
  sx,
  onDeleteClick,
  onCancelClick,
  title,
  text,
  isLoading,
  isError,
  errorMessage,
}: BackOfficeWarningWindowProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'BackOffice' });

  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick(product);
    }
  };

  return (
    <MainContainer sx={{ position: 'absolute', ...sx }}>
      <Box sx={{ display: 'flex', gap: '24px' }}>
        <StyledBox>
          <BackOfficeWarningIcon />
        </StyledBox>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <MainHeader>{title}</MainHeader>
          <SecondaryHeader>
            {text}
            {product?.productSubtype && (
              <ProductName>“{product.productSubtype}”?</ProductName>
            )}
            {employee?.firstName && employee?.lastName && (
              <ProductName>
                “{employee?.firstName} {employee?.lastName}”?
              </ProductName>
            )}
          </SecondaryHeader>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px',
        }}
      >
        {isLoading && <CircularProgress />}
        <Button variant="outlined" onClick={onCancelClick}>
          {t('ConfirmationWindow.cancelBtn')}
        </Button>
        <Button variant="contained" color="error" onClick={handleDeleteClick}>
          {t('ConfirmationWindow.deleteBtn')}
        </Button>
      </Box>
      {isError && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{ color: theme.palette.error.main }}>
            {errorMessage}
          </Typography>
        </Box>
      )}
    </MainContainer>
  );
};
