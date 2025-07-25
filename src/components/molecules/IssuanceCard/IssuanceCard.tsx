import { Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { CardWrapper, StyledTypography } from './IssuanceCard.styled';

import { ReactComponent as MastercardIconSVG } from 'assets/icons/Mastercard.svg';
import { ReactComponent as SimpleLogoSVG } from 'assets/icons/SimpleLogo.svg';
import { ReactComponent as SimpleVisaIconSVG } from 'assets/icons/SimpleVisaIcon.svg';
import { ECardIssuer, ECardType, IssuanceCardData } from 'models/IProductInfo';

export type IssuanceCardProps = Pick<
  IssuanceCardData,
  'cardName' | 'issueCurrency' | 'cardCurrency' | 'cardIssuer'
> & {
  issueFee?: IssuanceCardData['issueFee'];
  monthlyFee?: IssuanceCardData['monthlyFee'];
  cashback?: IssuanceCardData['cashbackRate'];
  cardType?: IssuanceCardData['cardType'];
  background: string;
};

const issuers: Record<IssuanceCardProps['cardIssuer'], ReactElement> = {
  [ECardIssuer.VISA]: <SimpleVisaIconSVG />,
  [ECardIssuer.MASTERCARD]: <MastercardIconSVG height={24} width={33} />,
};

export const IssuanceCard = ({
  cardName,
  issueFee,
  monthlyFee,
  issueCurrency,
  background,
  cardCurrency,
  cardType,
  cardIssuer,
  cashback,
}: IssuanceCardProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssuanceCard' });
  const fee = issueFee ?? monthlyFee ?? 0;
  const isIssueFeeProvided = issueFee ?? issueFee === null;
  const feeTitle = t(isIssueFeeProvided ? 'issuanceFee' : 'monthlyFee');
  const cardTypes = {
    [ECardType.DEBIT]: t('debitCard'),
    [ECardType.CREDIT]: t('creditCard'),
  };

  return (
    <CardWrapper background={background}>
      <Stack direction="row">
        <Stack gap="38px" flex={1}>
          <Typography fontWeight={500} fontSize={32} lineHeight={1.25}>
            {cardName}
          </Typography>
          <Stack gap="8px" sx={(theme) => ({ color: theme.palette.grey[400] })}>
            {typeof fee === 'number' && (
              <Stack direction="row">
                <StyledTypography>{feeTitle}:</StyledTypography>
                <StyledTypography fontWeight={500}>
                  {fee.toFixed(2)} {issueCurrency}
                </StyledTypography>
              </Stack>
            )}
            <Stack direction="row">
              <StyledTypography>{t('cardCurrency')}:</StyledTypography>
              <StyledTypography fontWeight={500}>
                {cardCurrency}
              </StyledTypography>
            </Stack>
            {typeof cashback === 'number' ? (
              <Stack direction="row">
                <StyledTypography>{t('cashback')}:</StyledTypography>
                <StyledTypography fontWeight={500}>
                  {cashback}%
                </StyledTypography>
              </Stack>
            ) : (
              <Stack direction="row">
                <StyledTypography>{t('type')}:</StyledTypography>
                <StyledTypography fontWeight={500}>
                  {cardTypes[cardType?.trim() as ECardType]}
                </StyledTypography>
              </Stack>
            )}
          </Stack>
        </Stack>
        <Stack justifyContent="space-between" alignItems="flex-end">
          <SimpleLogoSVG />
          {issuers[cardIssuer]}
        </Stack>
      </Stack>
    </CardWrapper>
  );
};
