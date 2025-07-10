import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Button } from '@mui/material';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { StyledContainer } from './TransfersPage.styled';

import { NavigationWarningModal } from 'components/atoms';
import { SelectView } from 'components/organisms/SelectView/SelectView';
import { TransferView } from 'components/organisms/TransferView/TransferView';

export const TRANSFER_METHODS = ['iban', 'card', 'owncards'] as const;
export type TTransferMethod = (typeof TRANSFER_METHODS)[number];

export const TransfersPage = () => {
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
      />

      <StyledContainer>
        {transferMethod ? (
          <TransferView
            transferMethod={transferMethod}
            onCancel={handleOpenModal}
          />
        ) : (
          <SelectView />
        )}
      </StyledContainer>
    </Box>
  );
};
