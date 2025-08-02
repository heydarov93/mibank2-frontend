import Stack from '@mui/material/Stack';
import { SxProps, Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

import { InfoPanel } from '../../atoms';

import { StyledTypography } from './IssuanceCardInfo.styled';

import { IIssuanceCardData } from 'models/ICard';

interface IssuanceCardInfoProps
  extends Pick<
    IIssuanceCardData,
    'cardCurrency' | 'monthlyFee' | 'foreignTransactionLimit' | 'cashbackRate'
  > {
  cardName: string;
  sx?: SxProps<Theme>;
}

export const IssuanceCardInfo = ({
  cardName,
  cardCurrency,
  monthlyFee,
  foreignTransactionLimit,
  cashbackRate,
  sx,
}: IssuanceCardInfoProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });

  return (
    <InfoPanel
      title={cardName}
      sx={sx}
      data-testid="issue-card-modal-selected-card-info"
    >
      <Stack gap={1} sx={(theme) => ({ color: theme.palette.grey[400] })}>
        <Stack direction="row">
          <StyledTypography>{t('monthlyFee')}:</StyledTypography>
          <StyledTypography fontWeight={500}>
            {cardCurrency} {monthlyFee?.toFixed(2).replace('.', ',')}
          </StyledTypography>
        </Stack>
        <Stack direction="row">
          <StyledTypography>{t('transactionLimit')}:</StyledTypography>
          <StyledTypography fontWeight={500}>
            {cardCurrency}{' '}
            {foreignTransactionLimit?.toLocaleString().replace(/,/g, ' ')}
          </StyledTypography>
        </Stack>
        <Stack direction="row">
          <StyledTypography>{t('cashbackAmount')}:</StyledTypography>
          <StyledTypography fontWeight={500}>{cashbackRate}%</StyledTypography>
        </Stack>
      </Stack>
    </InfoPanel>
  );
};
