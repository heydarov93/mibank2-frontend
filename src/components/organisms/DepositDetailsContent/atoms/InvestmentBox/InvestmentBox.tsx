import Box from '@mui/material/Box';
import { useTranslation } from 'react-i18next';

import {
  PrimaryText,
  SecondaryText,
  StyledContainer,
} from './InvestmentBox.styled';

import coinInvestingPicture from 'assets/webp/CoinInvesting.webp';
import { LOCALES } from 'constants/business/date';
import { INVESTMENT_AMOUNT } from 'constants/business/numbers';
import {
  calculateInterest,
  calculateProfit,
} from 'utils/helpers/financialHelpers';

export const InvestmentBox = ({ interestRate }: { interestRate: number }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });

  return (
    <Box
      sx={({ spacing, palette }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: spacing(4),
        alignItems: 'flex-end',
        boxShadow: `0px 4px 24px 0px ${palette.shadow.shadowLight}`,
        maxHeight: 'fit-content',
      })}
    >
      <StyledContainer>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Box>
              <SecondaryText>{t('willGive')}</SecondaryText>
              <PrimaryText>
                $
                {INVESTMENT_AMOUNT.toLocaleString(LOCALES.ENGLISH_US, {
                  useGrouping: true,
                })}
              </PrimaryText>
            </Box>
            <Box>
              <SecondaryText>{t('willTake')}</SecondaryText>
              <PrimaryText>
                $
                {calculateProfit(
                  INVESTMENT_AMOUNT,
                  interestRate,
                ).toLocaleString(LOCALES.ENGLISH_US, { useGrouping: true })}
              </PrimaryText>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={coinInvestingPicture}
              alt={t('coinInvestingPictureAlt')}
              style={{ display: 'block', width: 110 }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <SecondaryText>{t('depositAmount')}</SecondaryText>
            <SecondaryText>
              USD{' '}
              {INVESTMENT_AMOUNT.toLocaleString(LOCALES.ENGLISH_US, {
                useGrouping: true,
              })}
            </SecondaryText>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <SecondaryText>{t('interestRate')}</SecondaryText>
            <SecondaryText>{interestRate.toFixed(2)}%</SecondaryText>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <SecondaryText>{t('interestAmount')}</SecondaryText>
            <PrimaryText>
              USD{' '}
              {calculateInterest(
                INVESTMENT_AMOUNT,
                interestRate,
              ).toLocaleString(LOCALES.ENGLISH_US, { useGrouping: true })}
            </PrimaryText>
          </Box>
        </Box>
      </StyledContainer>
    </Box>
  );
};
