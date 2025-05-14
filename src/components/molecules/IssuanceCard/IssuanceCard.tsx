import { Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { CardWrapper, StyledTypography } from './IssuanceCard.styled';

import { ReactComponent as MastercardIcon } from 'assets/icons/Mastercard.svg';
import { ReactComponent as SimpleLogo } from 'assets/icons/SimpleLogo.svg';
import { ReactComponent as SimpleVisaIcon } from 'assets/icons/SimpleVisaIcon.svg';
import { IssuanceCardData } from 'models/IProductInfo';

export type IssuanceCardProps = Pick<
  IssuanceCardData,
  | 'name'
  | 'fee'
  | 'feeCurrency'
  | 'background'
  | 'currency'
  | 'cardType'
  | 'cardIssuer'
>;

const issuers: Record<IssuanceCardProps['cardIssuer'], ReactElement> = {
  visa: <SimpleVisaIcon />,
  mastercard: <MastercardIcon height={24} width={33} />,
};

export const IssuanceCard = ({
  name,
  fee,
  feeCurrency,
  background,
  currency,
  cardType,
  cardIssuer,
}: IssuanceCardProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssuanceCard' });

  return (
    <CardWrapper background={background}>
      <Stack direction="row">
        <Stack gap="38px" flex={1}>
          <Typography fontWeight={500} fontSize={32} lineHeight={1.25}>
            {name}
          </Typography>
          <Stack gap="8px" sx={(theme) => ({ color: theme.palette.grey[400] })}>
            <Stack direction="row">
              <StyledTypography>{t('issuanceFee')}:</StyledTypography>
              <StyledTypography fontWeight={500}>
                {fee.toFixed(2)} {feeCurrency}
              </StyledTypography>
            </Stack>
            <Stack direction="row">
              <StyledTypography>{t('cardCurrency')}:</StyledTypography>
              <StyledTypography fontWeight={500}>{currency}</StyledTypography>
            </Stack>
            <Stack direction="row">
              <StyledTypography>{t('type')}:</StyledTypography>
              <StyledTypography fontWeight={500}>{cardType}</StyledTypography>
            </Stack>
          </Stack>
        </Stack>
        <Stack justifyContent="space-between" alignItems="flex-end">
          <SimpleLogo />
          {issuers[cardIssuer]}
        </Stack>
      </Stack>
    </CardWrapper>
  );
};
