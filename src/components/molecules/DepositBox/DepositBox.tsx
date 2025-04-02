import { Box } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  DepositContainer,
  StyledContentContainer,
  StyledDepositName,
  StyledDescription,
  StyledSecondaryName,
} from './DepositBox.styled';

import { SubmitButton } from 'components/atoms';
import { theme } from 'theme/theme';

interface DepositBoxProps {
  depositName: string;
  depositDescription: string;
  depositRate: number;
  depositDuration: number;
  depositCurrency: string;
  redirect: string;
}

export const DepositBox = ({
  depositCurrency,
  depositDescription,
  depositDuration,
  depositName,
  depositRate,
  redirect,
  //TODO: Once backend is ready this will not be partial and all the info will be required
}: DepositBoxProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'DepositWindow' });

  return (
    <DepositContainer>
      <StyledContentContainer>
        <StyledDepositName>{depositName}</StyledDepositName>
        <Box sx={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <SubmitButton buttonContent={t('openDeposit')} />
          {/* TODO: Add proper routing logic once backend is ready */}
          <Link to={redirect} style={{ color: theme.palette.primary.main }}>
            {t('learnMore')}
          </Link>
        </Box>
      </StyledContentContainer>
      <StyledContentContainer>
        <StyledDescription>{depositDescription}</StyledDescription>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '67px',
          }}
        >
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
        </Box>
      </StyledContentContainer>
    </DepositContainer>
  );
};
