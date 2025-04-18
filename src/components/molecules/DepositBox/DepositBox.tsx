import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

import {
  DepositContainer,
  StyledContentContainer,
  StyledDepositIllustration,
  StyledDepositName,
  StyledDescription,
  StyledSecondaryName,
  StyledViewAllButton,
} from './DepositBox.styled';

import DepositCardSvg from 'assets/icons/DepositCardImg.svg';
import { SubmitButton } from 'components/atoms';
import OpenDepositModal from 'components/organisms/OpenDepositModal/OpenDepositModal';

interface DepositBoxProps {
  depositName: string;
  depositDescription: string;
  depositRate: number;
  depositDuration: number;
  depositCurrency: string;
  redirect?: string;
  openDeposit: boolean;
  setOpenDeposit: (openDeposit: boolean) => void;
}

export const DepositBox = ({
  depositCurrency,
  depositDescription,
  depositDuration,
  depositName,
  depositRate,
  openDeposit,
  setOpenDeposit,
  //TODO: Once backend is ready this will not be partial and all the info will be required
}: DepositBoxProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'DepositWindow' });

  return (
    <>
      <DepositContainer>
        <StyledContentContainer>
          <StyledDepositName>{depositName}</StyledDepositName>
          <Box sx={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
            <SubmitButton
              buttonContent={t('openDeposit')}
              onClick={() => setOpenDeposit(true)}
            />
            <StyledViewAllButton variant="outlined">
              {t('viewAllDeposits')}
            </StyledViewAllButton>
          </Box>
        </StyledContentContainer>

        <StyledDepositIllustration src={DepositCardSvg} />

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
      {openDeposit && (
        <OpenDepositModal
          onCancelClick={() => setOpenDeposit(false)}
          open={openDeposit}
        />
      )}
    </>
  );
};
