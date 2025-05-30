import { Box, Link, Stack, SxProps, Theme, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IssuanceCard } from '..';
import {
  OpenBusinessAccAddress,
  OpenBusinessAccAddressProps,
} from '../OpenBusinessAccAddress/OpenBusinessAccAddress';

import { SwitchWithLabel } from 'components/atoms/SwitchWithLabel/SwitchWithLabel';
import useDisclosure from 'hooks/useDisclosure';
import { OpenBusinessAccFormValues } from 'hooks/useOpenBusinessAccFlow';
import { IssuanceCardData } from 'models/IProductInfo';

const mockCardOptions: Record<string, IssuanceCardData> = {
  digital: {
    id: 1,
    name: 'Visa Business',
    fee: 0,
    feeCurrency: 'PLN',
    currency: 'PLN',
    background: 'linear-gradient(136deg, #4d9bc2 8.4%, #1e3456 92%)',
    cardIssuer: 'visa',
    cardType: 'Debit',
    issueType: 'Digital',
    cashbackRate: 0.1,
    monthlyFee: 0,
    foreignTransactionLimit: 10000,
    dailyOperationalLimit: 1000,
  },
  plastic: {
    id: 2,
    name: 'Visa Business',
    fee: 0,
    feeCurrency: 'PLN',
    currency: 'PLN',
    background: 'linear-gradient(136deg, #b3261e 8.4%, #4d110d 92%)',
    cardIssuer: 'visa',
    cardType: 'Debit',
    issueType: 'Digital',
    cashbackRate: 0.1,
    monthlyFee: 0,
    foreignTransactionLimit: 10000,
    dailyOperationalLimit: 1000,
  },
};

interface BusinessSelectedCardInfoProps {
  onEdit: OpenBusinessAccAddressProps['onEdit'];
  sx?: SxProps<Theme>;
}

export const BusinessSelectedCardInfo = ({
  onEdit,
  sx,
}: BusinessSelectedCardInfoProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OpenBusinessAccountModal',
  });
  const { watch, setValue } = useFormContext<OpenBusinessAccFormValues>();
  const issueType = watch('issueType');
  const isAgreed = watch('termsAccepted');
  const cardData = mockCardOptions[issueType];
  const { isOpen: isLinkVisited, open: markLinkAsVisited } =
    useDisclosure(isAgreed);
  const isPlasticCard = issueType === 'plastic';

  function handleSwitchChange() {
    setValue('termsAccepted', !isAgreed, { shouldValidate: true });
  }

  return (
    <Stack color="black" sx={sx} data-testid="business-card-info">
      <Box sx={{ alignSelf: 'center' }}>
        <IssuanceCard
          name={cardData.name}
          background={cardData.background}
          monthlyFee={cardData.monthlyFee}
          feeCurrency={cardData.feeCurrency}
          currency={cardData.currency}
          cashback={cardData.cashbackRate}
          cardIssuer={cardData.cardIssuer}
        />
      </Box>

      {isPlasticCard && (
        <OpenBusinessAccAddress onEdit={onEdit} sx={{ mt: 4 }} />
      )}

      <Typography fontSize={14} mt={4.5}>
        {t('confirmationInfo')}{' '}
        <Link
          // TODO: replace '#' with actual link
          href="#"
          target="_blank"
          onClick={markLinkAsVisited}
          data-testid="agreement-link"
        >
          {t('cardTermsLink')}
        </Link>
      </Typography>

      <SwitchWithLabel
        label={t('confirmation')}
        disabled={!isLinkVisited}
        checked={isAgreed}
        onChange={handleSwitchChange}
        data-testid="switch-confirmation"
        sx={{ mt: 2 }}
      />
    </Stack>
  );
};
