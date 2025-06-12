import {
  CircularProgress,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SmallIssuanceCard } from 'components/molecules';
import { IssuanceCardData } from 'models/IProductInfo';

interface IssueCardsSelectionListProps {
  cards: IssuanceCardData[];
  isLoading?: boolean;
  selectedCard: IssuanceCardData | null;
  onCardSelect: (card: IssuanceCardData) => void;
  sx?: SxProps<Theme>;
}

const CARDS_PER_ROW = 3;
const REMAINDER_TO_CENTER = 2;

export const IssueCardsSelectionList = ({
  cards,
  selectedCard,
  sx,
  isLoading,
  onCardSelect,
}: IssueCardsSelectionListProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });
  const centerCards = cards.length % CARDS_PER_ROW === REMAINDER_TO_CENTER;

  return (
    <Stack
      data-testid="issue-card-modal-cards-selection"
      sx={{ gap: 2.5, ...sx }}
    >
      <Typography fontWeight={600} fontSize={24}>
        {t('selectCard')}
      </Typography>
      <Stack
        direction="row"
        gap={1}
        justifyContent={centerCards ? 'center' : 'flex-start'}
        flexWrap="wrap"
      >
        {isLoading ? (
          <CircularProgress sx={{ m: 'auto' }} size={36} />
        ) : cards.length === 0 ? (
          <Typography
            sx={(theme) => ({
              textAlign: 'center',
              color: theme.palette.common.black,
              width: '100%',
              mt: 1.5,
            })}
          >
            {t('noAvailableCards')}
          </Typography>
        ) : (
          cards.map((card, i) => {
            const fee = card.issueFee ?? 0;

            return (
              <SmallIssuanceCard
                key={i}
                name={card.cardName}
                fee={fee.toFixed(2) + ' ' + card.cardCurrency}
                background="#000"
                selected={selectedCard?.cardId === card.cardId}
                onClick={() => onCardSelect(card)}
              />
            );
          })
        )}
      </Stack>
    </Stack>
  );
};
