import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  StyledContainer,
  PrimaryText,
  SecondaryText,
} from './InvestmentBox.styled';

import coinInvestingPicture from 'assets/webp/CoinInvesting.webp';
import { SubmitButton } from 'components/atoms';
import { investmentAmount } from 'constants/learnMorePage';
import { calculateInterest, calculateProfit } from 'utils/interestRateUtils';

interface InvestmentBoxProps {
  interestRate: number;
  setOpenDeposit: (openDeposit: boolean) => void;
}

export const InvestmentBox = ({
  interestRate,
  setOpenDeposit,
}: InvestmentBoxProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'flex-end',
      }}
    >
      <StyledContainer>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <SecondaryText>{t('willGive')}</SecondaryText>
            <PrimaryText>
              ${investmentAmount.toLocaleString('en-US', { useGrouping: true })}
            </PrimaryText>
          </Box>
          <Box>
            <SecondaryText>{t('willTake')}</SecondaryText>
            <PrimaryText>
              $
              {calculateProfit(investmentAmount, interestRate).toLocaleString(
                'en-US',
                { useGrouping: true },
              )}
            </PrimaryText>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <img src={coinInvestingPicture} />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <SecondaryText>{t('depositAmount')}</SecondaryText>
            <SecondaryText>
              USD{' '}
              {investmentAmount.toLocaleString('en-US', { useGrouping: true })}
            </SecondaryText>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <SecondaryText>{t('interestRate')}</SecondaryText>
            <SecondaryText>{interestRate.toFixed(2)}%</SecondaryText>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <SecondaryText>{t('interestAmount')}</SecondaryText>
            <PrimaryText>
              USD{' '}
              {calculateInterest(investmentAmount, interestRate).toLocaleString(
                'en-US',
                { useGrouping: true },
              )}
            </PrimaryText>
          </Box>
        </Box>
      </StyledContainer>
      <SubmitButton
        buttonContent={t('openDeposit')}
        onClick={() => setOpenDeposit(true)}
      />
    </Box>
  );
};
