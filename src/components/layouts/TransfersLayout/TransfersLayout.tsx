import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { StyledContainer } from './TransfersLayout.styled';

import { NavigationWarningModal, SelectView, TransferView } from 'components/organisms';
import { TTransferMethod } from 'types/types';

export const TRANSFER_METHODS = ['iban', 'card', 'owncards'] as const;

export const TransfersLayout = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });
  const [searchParams, setSearchParams] = useSearchParams();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const transferMethod = useMemo<TTransferMethod | null>(() => {
    const method = searchParams.get('method');
    return TRANSFER_METHODS.includes(method as TTransferMethod)
      ? (method as TTransferMethod)
      : null;
  }, [searchParams]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleConfirmExit = () => {
    setModalOpen(false);
    setSearchParams({});
  };

  return (
    <Box width="100%">
      {transferMethod && (
        <Button
          variant="text"
          onClick={handleOpenModal}
          startIcon={<ArrowBackIosNewIcon />}
          sx={({ palette }) => ({ color: palette.common.black })}
          data-testid="back-button"
        >
          {t('goBack')}
        </Button>
      )}

      <NavigationWarningModal
        open={isModalOpen}
        onConfirm={handleConfirmExit}
        onCancel={handleCloseModal}
        title={t('warningModal.title')}
        description={t('warningModal.description')}
        testId="warning-modal"
      />

      <StyledContainer>
        {transferMethod ? (
          <TransferView
            transferMethod={transferMethod}
            onCancel={handleOpenModal}
            data-testid="transfer-view"
          />
        ) : (
          <SelectView data-testid="select-view" />
        )}
      </StyledContainer>
    </Box>
  );
};
