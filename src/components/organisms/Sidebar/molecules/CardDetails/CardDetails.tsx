import { Box, Collapse, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CardInfoButton } from '../../atoms/CardInfoButton/CardInfoButton';
import { CardDetailRow } from '../CardDetailRow/CardDetailRow';

import { IUserBankCard } from 'models/IUserCard';


type CardDetailsProps = Pick<
  IUserBankCard,
  | 'status'
  | 'holder'
  | 'number'
  | 'cvv'
  | 'iban'
  | 'swift'
  | 'issueDate'
  | 'cashbackRate'
>;

export function CardDetails({ data }: { data: CardDetailsProps }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar.myCards',
  });

  const [showCardInfo, setShowCardInfo] = useState(false);

  function handleCopy(value: string | number) {
    navigator.clipboard.writeText(value.toString());
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        fontFamily="Urbanist"
        fontWeight={600}
      >
        <Typography fontFamily="inherit" fontSize={18} fontWeight="inherit">
          {t('primaryCard')} ★
        </Typography>
        <CardInfoButton clicked={showCardInfo} onClick={setShowCardInfo} />
      </Box>
      <Collapse
        in={showCardInfo}
        timeout="auto"
        sx={{
          '& .MuiStack-root': {
            marginTop: 2.5,
          },
        }}
      >
        <Stack gap={2}>
          <CardDetailRow
            name={t('status')}
            value={t(data.status)}
            valueSx={{
              color: data.status === 'active' ? 'success.main' : 'error.main',
            }}
          />
          <CardDetailRow name={t('cardHolder')} value={data.holder} />
          <CardDetailRow
            name={t('cardNumber')}
            value={data.number}
            maskFormat={`**** ${data.number.toString().slice(-4)}`}
          />
          <CardDetailRow name="CVV" value={data.cvv} maskFormat="***" />
          <CardDetailRow name="IBAN" value={data.iban} onCopy={handleCopy} />
          <CardDetailRow name="SWIFT/BIC" value={data.swift} />
          <CardDetailRow name={t('issueDate')} value={data.issueDate} />
          <CardDetailRow
            name={t('cashbackRate')}
            value={`${data.cashbackRate}%`}
          />
        </Stack>
      </Collapse>
    </Box>
  );
}
