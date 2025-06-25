import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CardData } from '../SelectedCardDetails';
import { StyledInfoSection } from '../SelectedCardDetails.styled';

import InfoRow from './InfoRow';

interface CardDataProps {
  cardData: CardData;
}

const InfoTab = ({ cardData }: CardDataProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'AllCards.selectedCard',
  });
  const [showCardNumber, setShowCardNumber] = useState<boolean>(false);
  const [showCvv, setShowCvv] = useState<boolean>(false);

  const getDisplayCardNumber = () => showCardNumber ? '1234 5678 9012 5846' : cardData.cardNumber;

  const getDisplayCvv = () => (showCvv ? '123' : cardData.cvv);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <StyledInfoSection data-testid="card-info-section">
      <InfoRow
        label={t('statusLabel')}
        value={cardData.status}
        status={cardData.status}
        data-status={cardData.status}
        data-testid="info-row-card-status"
      />
      <InfoRow
        label={t('holderLabel')}
        value={cardData.cardHolder}
        data-testid="info-row-card-holder"
      />
      <InfoRow
        label={t('numberLabel')}
        value={getDisplayCardNumber()}
        masked
        onToggle={() => setShowCardNumber((prev) => !prev)}
        showIcon={showCardNumber}
        data-testid="info-row-card-number"
      />
      <InfoRow
        label={t('cvvLabel')}
        value={getDisplayCvv()}
        onToggle={() => setShowCvv((prev) => !prev)}
        showIcon={showCvv}
        data-testid="info-row-cvv"
        masked
      />
      <InfoRow
        label={t('ibanLabel')}
        value={cardData.iban}
        onCopy={() => copyToClipboard(cardData.iban)}
        data-testid="info-row-iban"
      />
      <InfoRow
        label={t('swiftLabel')}
        value={cardData.swiftBic}
        data-testid="info-row-swift-bic"
      />
      <InfoRow
        label={t('dateLabel')}
        value={cardData.issueDate}
        data-testid="info-row-issue-date"
      />
      <InfoRow
        label={t('rateLabel')}
        value={cardData.cashbackRate}
        data-testid="info-row-cashback-rate"
      />
    </StyledInfoSection>
  );
};

export default InfoTab;
