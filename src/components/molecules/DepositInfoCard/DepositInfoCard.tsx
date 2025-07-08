import { Box, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DepositBenefitItem } from './DepositBenefitItem';
import {
  StyledBenefitList,
  StyledCardContainer,
  StyledDepositIllustration,
  StyledInfoCardColumn,
  StyledInfoCardDesc,
  StyledInfoCardSubTitle,
  StyledInfoCardTitle,
} from './DepositInfoCard.styled';

import DepositCardSvg from 'assets/icons/DepositCardImg.svg';
import { IDeposit } from 'models/IDepositInfo';

type DepositInfoCardProps = IDeposit;

export const DepositInfoCard = ({
  name,
  description,
  min,
  term,
  interestRate,
  capitalization,
  earlyWithdrawalFee,
  earlyWithdrawalLimit,
}: DepositInfoCardProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'DepositWindow' });
  const benefitsText = [
    {
      mainText: t('excitingRates'),
      secondaryText: t('interestRate', {
        procent: interestRate,
        months: term,
      }),
    },
    {
      mainText: t('minimumDepositText'),
      secondaryText: t('minimumDeposit', {
        minDeposit: min,
      }),
    },
    // TODO - Add data from API when it's available.
    {
      mainText: t('balanceReview'),
      secondaryText: '27.01.2025',
    },
    {
      mainText: t('moneyAddOn'),
      secondaryText: t('moneyAddOnText'),
    },
    {
      mainText: t('capitalizationRate'),
      secondaryText: `${capitalization}%`,
    },
    {
      mainText: t('earlyWdLimit'),
      secondaryText: t('earlyWdLimitText', {
        procent: earlyWithdrawalLimit,
      }),
    },
    {
      mainText: t('wdFee'),
      secondaryText: t('wdFeeText', {
        procent: earlyWithdrawalFee,
      }),
    },
  ];

  return (
    <StyledCardContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <StyledInfoCardTitle>{name}</StyledInfoCardTitle>
      </Box>

      <Stack sx={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <StyledInfoCardColumn>
          <StyledInfoCardDesc>{description}</StyledInfoCardDesc>
          <StyledInfoCardSubTitle>You will get:</StyledInfoCardSubTitle>
        </StyledInfoCardColumn>
        <StyledDepositIllustration src={DepositCardSvg} />
      </Stack>

      <StyledBenefitList>
        {benefitsText.map((text, index) => (
          <DepositBenefitItem
            mainText={text.mainText}
            secondaryText={text.secondaryText}
            key={index}
          />
        ))}
      </StyledBenefitList>
    </StyledCardContainer>
  );
};
