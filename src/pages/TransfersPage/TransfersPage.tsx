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

enum ETransferMethod {
  IBAN = 'IBAN',
  CARD = 'CARD',
  OWNCARDS = 'OWNCARDS',
}

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
        <Typography
          variant="h1"
          fontSize={26}
          fontWeight={600}
          color="common.black"
        >
          {t('title')}
        </Typography>
        <StyledButtonsContainer>
          <TransferButton
            onClick={handleTransfer(ETransferMethod.IBAN)}
            label={t('byIBAN')}
            icon={<AccountBalanceIcon />}
          />
          <TransferButton
            onClick={handleTransfer(ETransferMethod.CARD)}
            label={t('byCardNumber')}
            icon={<CreditCardIcon />}
          />
          <TransferButton
            onClick={handleTransfer(ETransferMethod.OWNCARDS)}
            label={t('betweenOwnCards')}
            icon={<LoopIcon />}
          />
        </StyledButtonsContainer>
      </StyledContainer>
    </Box>
  );
}
