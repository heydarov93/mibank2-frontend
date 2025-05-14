import { Stack, SxProps, Theme, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SmallIssuanceCard } from 'components/molecules';
import { IssuanceCardData } from 'models/IProductInfo';

interface IssueCardsSelectionListProps {
  cards: IssuanceCardData[];
  selectedCard: IssuanceCardData | null;
  onCardSelect: (card: IssuanceCardData) => void;
  sx?: SxProps<Theme>;
}

export const IssueCardsSelectionList = ({
  cards,
  selectedCard,
  sx,
  onCardSelect,
}: IssueCardsSelectionListProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'IssueCardModal' });

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
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {cards.map((card, i) => (
          <SmallIssuanceCard
            key={i}
            name={card.name}
            fee={card.fee.toFixed(2) + card.currency}
            background={card.background}
            selected={selectedCard?.id === card.id}
            onClick={() => onCardSelect(card)}
          />
        ))}
      </Stack>
    </Stack>
  );
};
