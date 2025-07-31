import { KeyboardArrowDown } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import {
  StyledAccordionSummary,
  StyledDepositName,
  StyledStatusChip,
  StyledStatusChipWrapper,
  StyledSummaryContainer,
  StyledSummaryTitleWrapper,
} from '../MyDepositsDetails.styled';
import SummaryInfoItem from '../molecules/SummaryInfoItem';

import { CoinsStackedIcon } from 'components/atoms/CoinsStackedIcon/CoinsStackedIcon';

function MyDepositsSummary() {
  const { t } = useTranslation('translation', { keyPrefix: 'myDepositsPage' });
  return (
    <StyledAccordionSummary expandIcon={<KeyboardArrowDown />}>
      <StyledSummaryContainer>
        <StyledSummaryTitleWrapper>
          <CoinsStackedIcon />
          <StyledDepositName>Deposit Name</StyledDepositName>
        </StyledSummaryTitleWrapper>
        <StyledStatusChipWrapper>
          <StyledStatusChip label={'Active'} />
        </StyledStatusChipWrapper>
      </StyledSummaryContainer>
      <StyledSummaryContainer>
        <SummaryInfoItem
          label={t('summaryLabels.amount')}
          value={'10 500 PLN'}
        />
        <SummaryInfoItem
          label={t('summaryLabels.duration')}
          value={'6 months'}
        />
        <SummaryInfoItem
          label={t('summaryLabels.endingDate')}
          value={'19/05/2024'}
        />
      </StyledSummaryContainer>
    </StyledAccordionSummary>
  );
}

export default MyDepositsSummary;
