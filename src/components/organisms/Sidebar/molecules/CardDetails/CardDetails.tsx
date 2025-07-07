import {
  Box,
  CircularProgress,
  Collapse,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CardInfoButton } from '../../atoms/CardInfoButton/CardInfoButton';
import { useGetUserCardDetails } from '../../organisms/MyCards/hooks/useGetUserCardDetails';
import { CardDetailRow } from '../CardDetailRow/CardDetailRow';

import { copyToClipboard } from 'utils/helpers';

interface Props {
  cardId: string | number;
  isCardPrimary: boolean;
}

export function CardDetails({ cardId, isCardPrimary }: Props) {
  const [showCardInfo, setShowCardInfo] = useState(false);
  const { t } = useTranslation('translation', {
    keyPrefix: 'Homepage.sidebar.myCards',
  });
  const { data, isLoading } = useGetUserCardDetails(cardId);


  return (
    <Box>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        alignItems="center"
        fontFamily="Urbanist"
        fontWeight={600}
      >
        {isCardPrimary && (
          <Typography fontFamily="inherit" fontSize={18} fontWeight="inherit">
            {t('primaryCard')} ★
          </Typography>
        )}
        <CardInfoButton
          clicked={showCardInfo}
          onClick={setShowCardInfo}
          disabled={!data}
          sx={{ gridColumn: 2, justifySelf: 'end' }}
        />
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
        {isLoading && (
          <Box display="flex" justifyContent="center">
            <CircularProgress size={20} />
          </Box>
        )}
        {data && (
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
            <CardDetailRow name="IBAN" value={data.iban} onCopy={copyToClipboard} />
            <CardDetailRow name="SWIFT/BIC" value={data.swift} />
            <CardDetailRow name={t('issueDate')} value={data.issueDate} />
            <CardDetailRow
              name={t('cashbackRate')}
              value={`${data.cashbackRate}%`}
            />
          </Stack>
        )}
      </Collapse>
    </Box>
  );
}
