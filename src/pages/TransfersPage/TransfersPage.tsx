import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createSearchParams, useSearchParams } from 'react-router-dom';

import {
  StyledBackButton,
  StyledButtonsContainer,
  StyledContainer,
} from './TransfersPage.styled';

import { NavigationWarningModal } from 'components/atoms';
import { TransferButton } from 'components/molecules/TransferButton/TransferButton';
import { TransferForm } from 'components/organisms/TransferForm/TransferForm';
import { TransferMethodMenu } from 'components/organisms/TransferMethodMenu/TransferMethodMenu';

export const transferMethods = ['iban', 'card', 'owncards'] as const;
export type TTransferMethod = (typeof transferMethods)[number];

export function TransfersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const transferMethod = searchParams.get('method') as TTransferMethod;
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });
  const [navigationModalOpen, setNavigationModalOpen] = useState(false);

  function handleCancelConfirm() {
    setNavigationModalOpen(true);
  }

  function handleExitForm() {
    setSearchParams({});
    handleCancelNavigation();
  }

  function handleCancelNavigation() {
    setNavigationModalOpen(false);
  }

  return (
    <Box width="100%">
      {transferMethod && (
        <StyledBackButton
          onClick={handleCancelConfirm}
          variant="text"
          startIcon={<ArrowBackIosNewIcon />}
        >
          {t('goBack')}
        </StyledBackButton>
      )}

      <NavigationWarningModal
        open={navigationModalOpen}
        onConfirm={handleExitForm}
        onCancel={handleCancelNavigation}
      />

      <StyledContainer>
        {!transferMethod && (
          <>
            <Typography
              variant="h1"
              fontSize={26}
              fontWeight={600}
              color="common.black"
            >
              {t('title')}
            </Typography>

            <StyledButtonsContainer>
              {Object.values(transferMethods).map((method) => (
                <TransferButton
                  key={method}
                  to={{
                    search: createSearchParams({ method: method }).toString(),
                  }}
                  label={t(method)}
                  transferMethod={method}
                />
              ))}
            </StyledButtonsContainer>
          </>
        )}

        {transferMethod && (
          <>
            <Box display="flex" gap={1}>
              <Typography
                variant="h1"
                fontSize={26}
                fontWeight={600}
                color="common.black"
              >
                {t('formTitle')}
              </Typography>
              <TransferMethodMenu />
            </Box>
            <TransferForm key={transferMethod} onCancel={handleCancelConfirm} />
          </>
        )}
      </StyledContainer>
    </Box>
  );
}
