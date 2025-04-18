import CloseIcon from '@mui/icons-material/Close';
import { Box, List } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { DepositBenefitItem } from './DepositBenefitItem';
import {
  StyledCardContainer,
  StyledCloseButton,
  StyledDepositIllustration,
  StyledInfoCardColumn,
  StyledInfoCardDesc,
  StyledInfoCardSubTitle,
  StyledInfoCardTitle,
} from './DepositInfoCard.styled';

import DepositCardSvg from 'assets/icons/DepositCardImg.svg';

interface DepositInfoCardProps {
  id: number;
  title: string;
  description: string;
  minDeposit: number;
  months: number;
  capitalizationRate: number;
  interestRate: number;
  onCloseModal: () => void;
}

const DepositInfoCard = ({
  title,
  description,
  minDeposit,
  months,
  interestRate,
  capitalizationRate,
  onCloseModal,
}: DepositInfoCardProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'DepositWindow' });
  const benefitsText = [
    {
      mainText: t('excitingRates'),
      secondaryText: t('interestRate', {
        procent: interestRate,
        months: months,
      }),
    },
    {
      mainText: t('minimumDepositText'),
      secondaryText: t('minimumDeposit', {
        minDeposit: minDeposit,
      }),
    },
    {
      mainText: t('easySetup'),
      secondaryText: t('easySetupText'),
    },
    {
      mainText: t('balanceReview'),
      secondaryText: '27.01.2025',
    },
    {
      mainText: t('capitalizationRate'),
      secondaryText: `${capitalizationRate}%`,
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
        <StyledInfoCardTitle>{title}</StyledInfoCardTitle>
        <StyledCloseButton onClick={onCloseModal}>
          <CloseIcon />
        </StyledCloseButton>
      </Box>

      <StyledInfoCardColumn>
        <StyledInfoCardDesc>{description}</StyledInfoCardDesc>
        <StyledInfoCardSubTitle>You will get:</StyledInfoCardSubTitle>
      </StyledInfoCardColumn>

      <StyledDepositIllustration src={DepositCardSvg} />

      <List sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {benefitsText.map((text, index) => (
          <DepositBenefitItem
            mainText={text.mainText}
            secondaryText={text.secondaryText}
            key={index}
          />
        ))}
      </List>
    </StyledCardContainer>
  );
};

export default DepositInfoCard;
