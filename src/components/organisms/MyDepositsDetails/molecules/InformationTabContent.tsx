import { ContentCopyOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  StyledCopyIconButton,
  StyledInfoFieldLabel,
  StyledInfoFieldValue,
  StyledInformationTabContent,
} from '../MyDepositsDetails.styled';

import InfoFieldItem from './InfoFieldItem';

import { copyToClipboard } from 'utils/helpers';

function InformationTabContent() {
  const { t } = useTranslation('translation', {
    keyPrefix: 'myDepositsDetails.tabs.information',
  });

  return (
    <StyledInformationTabContent>
      <InfoFieldItem label={t('labels.depositType')} value="Savings Deposit" />
      <InfoFieldItem label={t('labels.interestRate')} value="10,00%" />
      <StyledInfoFieldLabel>{t('labels.accountNumber')}</StyledInfoFieldLabel>
      <Stack direction={'row'} gap={3}>
        <StyledInfoFieldValue component="p">
          PL 12 111 6666 0000000012345678
        </StyledInfoFieldValue>
        <StyledCopyIconButton
          aria-label={t('ariaLabels.copyIcon')}
          onClick={() => copyToClipboard('PL 12 111 6666 0000000012345678')}
        >
          <ContentCopyOutlined />
        </StyledCopyIconButton>
      </Stack>
      <InfoFieldItem label={t('labels.withdrawalFee')} value="15%" />
      <InfoFieldItem label={t('labels.withdrawalLimit')} value="1000 PLN" />
      <InfoFieldItem label={t('labels.capitalizationRate')} value="0,00%" />
    </StyledInformationTabContent>
  );
}

export default InformationTabContent;
