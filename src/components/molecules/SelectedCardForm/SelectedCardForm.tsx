import { Box, Button, Link, Stack, Switch, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IssuanceCardProps } from '../IssuanceCard/IssuanceCard';

import { AccountSelect, IssuanceCard } from 'components/molecules';
import { CardIssueFormValues } from 'components/organisms/IssueCardModal/IssueCardModal';
import useDisclosure from 'hooks/useDisclosure';

interface SelectedCardFormProps extends IssuanceCardProps {
  onCancel: () => void;
}

export const SelectedCardForm = ({
  name,
  fee,
  feeCurrency,
  background,
  currency,
  cardType,
  cardIssuer,
  onCancel,
}: SelectedCardFormProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });
  const { control, watch } = useFormContext<CardIssueFormValues>();
  const { isOpen: isLinkVisited, open: markLinkAsVisited } = useDisclosure();
  const { isOpen: isAgreed, toggle: toggleConfirmation } = useDisclosure();
  const isCardFree = fee === 0;
  const isPaymentAccSelected = isCardFree || Boolean(watch('paymentAccount'));
  const isConfirmBtnDisabled = !isAgreed || !isPaymentAccSelected;
  const confirmBtnText = isCardFree ? t('issueCard') : t('confirm');

  return (
    <Box data-testid="selected-card-form">
      <Box sx={{ mt: '24px' }}>
        <IssuanceCard
          name={name}
          background={background}
          fee={fee}
          feeCurrency={feeCurrency}
          currency={currency}
          cardType={cardType}
          cardIssuer={cardIssuer}
        />
      </Box>
      <Stack direction="row" justifyContent="space-between" mt="40px" gap="8px">
        <Typography fontSize={14} fontWeight={500}>
          {t('confirmation')}
        </Typography>
        <Switch
          disabled={!isLinkVisited}
          onChange={toggleConfirmation}
          value={isAgreed}
          data-testid="switch-confirmation"
        />
      </Stack>
      <Link
        // TODO: replace '#' with actual link
        href="#"
        target="_blank"
        sx={{
          mt: '8px',
          display: 'inline-block',
          fontSize: 14,
          fontWeight: 500,
        }}
        onClick={markLinkAsVisited}
        data-testid="agreement-link"
      >
        {t('cardTermsLink')}
      </Link>
      <Typography fontWeight={500} fontSize={32} textAlign="right" mt="32px">
        {fee.toFixed(2)} {currency}
      </Typography>
      {!isCardFree && <AccountSelect name="paymentAccount" control={control} />}
      <Stack
        direction="row"
        justifyContent="flex-end"
        gap="24px"
        mt="32px"
        height="56px"
      >
        <Button variant="outlined" sx={{ width: '113px' }} onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button
          variant="contained"
          disabled={isConfirmBtnDisabled}
          type="submit"
          data-testid="confirm-btn"
        >
          {confirmBtnText}
        </Button>
      </Stack>
    </Box>
  );
};
