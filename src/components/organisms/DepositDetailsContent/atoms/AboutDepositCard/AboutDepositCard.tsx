import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { AboutDepositItem } from '../AboutDepositItem/AboutDepositItem';

import { theme } from 'theme/theme';

interface AboutDepositCardProps {
  depositName: string;
  interestRate: number;
  minDeposit: number;
  months: number;
  wdLimit: number;
  wdFee: number;
  capitalizationRate: number;
}

export const AboutDepositCard = ({
  depositName,
  interestRate,
  months,
  wdFee,
  wdLimit,
  capitalizationRate,
  minDeposit,
}: AboutDepositCardProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'DepositWindow' });
  const offersText = [
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
    {
      mainText: t('moneyAddOn'),
      secondaryText: t('moneyAddOnText'),
    },
    {
      mainText: t('earlyWdLimit'),
      secondaryText: t('earlyWdLimit', { procent: wdLimit }),
    },
    {
      mainText: t('wdFee'),
      secondaryText: t('wdFeeText', { procent: wdFee }),
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <Box>
        <Typography
          sx={{
            fontFamily: theme.typography.mediumLogo?.fontFamily,
            fontWeight: 500,
            fontSize: '40px',
          }}
        >
          {t('aboutDepositName', { depositName: depositName })}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {offersText.map((item) => (
          <AboutDepositItem
            key={item.mainText}
            mainText={item.mainText}
            secondaryText={item.secondaryText}
          />
        ))}
      </Box>
    </Box>
  );
};
