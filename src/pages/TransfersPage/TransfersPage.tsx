import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LoopIcon from '@mui/icons-material/Loop';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledBackButton,
  StyledButtonsContainer,
  StyledContainer,
} from './TransfersPage.styled';

import { TransferButton } from 'components/molecules/TransferButton/TransferButton';
import { TransferForm } from 'components/organisms/TransferForm/TransferForm';
import { ETransferMethod } from 'components/organisms/TransferForm/enums/ETransferMethod';
import { TransferMethodMenu } from 'components/organisms/TransferMethodMenu/TransferMethodMenu';

const Icon = ({ item }: { item: ETransferMethod }) =>
  item === ETransferMethod.IBAN ? (
    <AccountBalanceIcon />
  ) : item === ETransferMethod.CARD ? (
    <CreditCardIcon />
  ) : (
    <LoopIcon />
  );

export default function TransfersPage() {
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });
  const [transferMethod, setTransferMethod] = useState<ETransferMethod | null>(
    null,
  );

  const handleTransfer = (method: ETransferMethod | null) => () =>
    setTransferMethod(method);

  return (
    <Box sx={{ marginTop: '24px' }}>
      {transferMethod && (
        <StyledBackButton
          onClick={handleTransfer(null)}
          variant="text"
          startIcon={<ArrowBackIosNewIcon />}
        >
          {t('goBack')}
        </StyledBackButton>
      )}

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
              {(Object.values(ETransferMethod) as ETransferMethod[]).map(
                (item) => (
                  <TransferButton
                    key={item}
                    onClick={handleTransfer(item)}
                    label={t(item)}
                    icon={<Icon item={item} />}
                  />
                ),
              )}
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
              <TransferMethodMenu
                transferMethod={transferMethod}
                onSetMethod={setTransferMethod}
              />
            </Box>
            <TransferForm
              key={transferMethod}
              transferMethod={transferMethod}
            />
          </>
        )}
      </StyledContainer>
    </Box>
  );
}
