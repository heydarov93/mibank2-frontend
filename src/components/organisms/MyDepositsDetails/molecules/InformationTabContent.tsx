import { ContentCopyOutlined } from '@mui/icons-material';
import { Stack } from '@mui/material';

import {
  StyledCopyIconButton,
  StyledInfoFieldLabel,
  StyledInfoFieldValue,
  StyledInformationTabContent,
} from '../MyDepositsDetails.styled';

import InfoFieldItem from './InfoFieldItem';

import { copyToClipboard } from 'utils/helpers';

function InformationTabContent() {
  return (
    <StyledInformationTabContent>
      <InfoFieldItem label="Deposit type" value="Savings Deposit" />
      <InfoFieldItem label="Interest rate" value="10,00%" />
      <StyledInfoFieldLabel>Account number</StyledInfoFieldLabel>
      <Stack direction={'row'} gap={3}>
        <StyledInfoFieldValue component="p">
          PL 12 111 6666 0000000012345678
        </StyledInfoFieldValue>
        <StyledCopyIconButton
          aria-label="Copy account number"
          onClick={() => copyToClipboard('PL 12 111 6666 0000000012345678')}
        >
          <ContentCopyOutlined />
        </StyledCopyIconButton>
      </Stack>
      <InfoFieldItem label="Withdrawal fee" value="15%" />
      <InfoFieldItem label="Withdrawal limit" value="1000 PLN" />
      <InfoFieldItem label="Capitalization rate" value="0,00%" />
    </StyledInformationTabContent>
  );
}

export default InformationTabContent;
