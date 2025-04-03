import {
  Box,
  Button,
  CircularProgress,
  SxProps,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { TableData } from '../BackOfficeTableItem/BackOfficeTableItem';

import {
  MainContainer,
  MainHeader,
  ProductName,
  SecondaryHeader,
  StyledBox,
  Overlay,
} from './BackOfficeWarningWindow.styled';

import { BackOfficeWarningIcon } from 'components/atoms';
import CloseButtonX from 'components/atoms/CloseButtonX/CloseButtonX';

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
  isFailed?: boolean;
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
  const theme = useTheme();

  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick(product);
    }
  };

  return (
    <Overlay>
      <MainContainer sx={{ position: 'fixed', ...sx }}>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <StyledBox>
            <BackOfficeWarningIcon sx={{ color: theme.palette.error.main }} />
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
          <CloseButtonX onClick={onCancelClick} />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '12px',
          }}
        >
          {isLoading && <CircularProgress />}
          <Button
            variant="outlined"
            onClick={onCancelClick}
            sx={{ padding: '8px 24px' }}
          >
            {t('ConfirmationWindow.cancelBtn')}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteClick}
            sx={{ padding: '8px 24px' }}
          >
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
    </Overlay>
  );
};
