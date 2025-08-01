import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  OpenBusinessAccountAddress,
  OpenBusinessAccountAddressProps,
} from '../OpenBusinessAccountAddress/OpenBusinessAccountAddress';

import { SwitchWithLabel } from 'components/atoms/SwitchWithLabel/SwitchWithLabel';
import { IssuanceCard } from 'components/molecules';
import { ECardIssuer } from 'enums/ECardIssuer';
import { useDisclosure } from 'hooks';
import { OpenBusinessAccountFormValues } from 'hooks/business/useBusinessAccountFlow';
import { IIssuanceCardData } from 'models/ICard';

const mockCardOptions: Record<string, IIssuanceCardData> = {
  digital: {
    cardId: 1,
    cardName: 'Visa Business',
    issueFee: 0,
    issueCurrency: 'PLN',
    cardCurrency: 'PLN',
    cardIssuer: ECardIssuer.VISA,
    cardType: 'Debit',
    issueType: 'Digital',
    cashbackRate: 0.1,
    monthlyFee: 0,
    foreignTransactionLimit: 10000,
    dailyOperationalLimit: 1000,
  },
  plastic: {
    cardId: 2,
    cardName: 'Visa Business',
    issueFee: 0,
    issueCurrency: 'PLN',
    cardCurrency: 'PLN',
    cardIssuer: ECardIssuer.VISA,
    cardType: 'Debit',
    issueType: 'Digital',
    cashbackRate: 0.1,
    monthlyFee: 0,
    foreignTransactionLimit: 10000,
    dailyOperationalLimit: 1000,
  },
};

interface BusinessSelectedCardInfoProps {
  onEdit: OpenBusinessAccountAddressProps['onEdit'];
  sx?: SxProps<Theme>;
}

export const BusinessSelectedCardInfo = ({
  onEdit,
  sx,
}: BusinessSelectedCardInfoProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OpenBusinessAccountModal',
  });
  const { watch, setValue } = useFormContext<OpenBusinessAccountFormValues>();
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
          cardName={cardData.cardName}
          background="#000"
          monthlyFee={cardData.monthlyFee}
          issueCurrency={cardData.issueCurrency}
          cardCurrency={cardData.cardCurrency}
          cashback={cardData.cashbackRate}
          cardIssuer={cardData.cardIssuer}
        />
      </Box>

      {isPlasticCard && (
        <OpenBusinessAccountAddress onEdit={onEdit} sx={{ mt: 4 }} />
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
