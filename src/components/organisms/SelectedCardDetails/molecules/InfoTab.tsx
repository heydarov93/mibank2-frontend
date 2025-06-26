import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StyledInfoSection } from '../SelectedCardDetails.styled';

import InfoRow from './InfoRow';

import { IUserBankCard } from 'models/IUserBankCard';

interface CardDataProps {
  selectedCard: IUserBankCard;
}

const InfoTab = ({ selectedCard }: CardDataProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'AllCards.selectedCard',
  });
  const [showCardNumber, setShowCardNumber] = useState<boolean>(false);
  const [showCvv, setShowCvv] = useState<boolean>(false);

  const getDisplayCardNumber = () =>
    showCardNumber
      ? selectedCard.number
      : `**** ${selectedCard.number.toString().slice(-4)}`;

  const getDisplayCvv = () => (showCvv ? selectedCard.cvv : '***');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <StyledInfoSection data-testid="card-info-section">
      <InfoRow
        label={t('statusLabel')}
        value={selectedCard?.status.toUpperCase()}
        status={selectedCard?.status}
        data-status={selectedCard?.status}
        data-testid="info-row-card-status"
      />
      <InfoRow
        label={t('holderLabel')}
        value={selectedCard?.holder}
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
        value={selectedCard.iban}
        onCopy={() => copyToClipboard(selectedCard.iban)}
        data-testid="info-row-iban"
      />
      <InfoRow
        label={t('swiftLabel')}
        value={selectedCard.swift}
        data-testid="info-row-swift-bic"
      />
      <InfoRow
        label={t('dateLabel')}
        value={selectedCard.issueDate}
        data-testid="info-row-issue-date"
      />
      <InfoRow
        label={t('rateLabel')}
        value={`${selectedCard.cashbackRate}%`}
        data-testid="info-row-cashback-rate"
      />
    </StyledInfoSection>
  );
};

export default InfoTab;
