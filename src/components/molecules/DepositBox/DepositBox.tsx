import { Box, Button } from '@mui/material';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import {
  DepositContainer,
  StyledContentContainer,
  StyledDepositIllustration,
  StyledDepositName,
  StyledDescription,
  StyledDescriptionItems,
  StyledSecondaryName,
} from './DepositBox.styled';

import DepositCardAnalyticsImg from 'assets/icons/DepositCardImg-1.svg';
import DepositCardPeopleImg from 'assets/icons/DepositCardImg-2.svg';
import DepositCardGrowthImg from 'assets/icons/DepositCardImg-3.svg';
import DepositCardNetworkImg from 'assets/icons/DepositCardImg-4.svg';
import DepositCardAbstractImg from 'assets/icons/DepositCardImg-5.svg';

interface DepositBoxProps {
  depositName: string;
  depositDescription: string;
  depositRate: number;
  depositDuration: number;
  depositCurrency: string;
  depositImgSrc: string;
  secondaryButton: ReactElement;
  onOpenDepositForm: () => void;
}

export const depositBoxImages = [
  DepositCardAnalyticsImg,
  DepositCardPeopleImg,
  DepositCardGrowthImg,
  DepositCardNetworkImg,
  DepositCardAbstractImg,
];

export const DepositBox = ({
  depositCurrency,
  depositDescription,
  depositDuration,
  depositName,
  depositRate,
  depositImgSrc,
  onOpenDepositForm,
  secondaryButton,
}: DepositBoxProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'DepositWindow' });

  return (
    <DepositContainer>
      <StyledContentContainer>
        <StyledDepositName>{depositName}</StyledDepositName>
        <Box display="flex" gap={3} alignItems="center">
          <Button
            variant="contained"
            onClick={onOpenDepositForm}
            sx={(theme) => ({ padding: theme.spacing(1, 2) })}
            data-testid="open-current-deposit-button"
          >
            {t('openDeposit')}
          </Button>
          {secondaryButton}
        </Box>
      </StyledContentContainer>

      <StyledDepositIllustration src={depositImgSrc} />

      <StyledContentContainer>
        <StyledDescription>{depositDescription}</StyledDescription>
        <StyledDescriptionItems>
          <Box>
            <StyledSecondaryName>{depositRate}%</StyledSecondaryName>
            <StyledDescription>{t('rate')}</StyledDescription>
          </Box>
          <Box>
            <StyledSecondaryName>
              {t('months', { months: depositDuration })}
            </StyledSecondaryName>
            <StyledDescription>{t('duration')}</StyledDescription>
          </Box>
          <Box>
            <StyledSecondaryName>{depositCurrency}</StyledSecondaryName>
            <StyledDescription>{t('currency')}</StyledDescription>
          </Box>
        </StyledDescriptionItems>
      </StyledContentContainer>
    </DepositContainer>
  );
};
