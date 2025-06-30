import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import InfoRow from '../InfoRow/InfoRow';

import { StyledInfoSection } from './InfoRow.styled';

import { IUserBankCard } from 'models/IUserBankCard';

export type TUserBankCardDetails = Pick<
  IUserBankCard,
  | 'id'
  | 'holder'
  | 'number'
  | 'cvv'
  | 'iban'
  | 'swift'
  | 'issueDate'
  | 'cashbackRate'
  | 'status'
  | 'isPrimary'
>;

const InfoTab = ({
  selectedUserCardDetails,
}: {
  selectedUserCardDetails: TUserBankCardDetails;
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'AllCards.selectedCard',
  });
  const [showCardNumber, setShowCardNumber] = useState<boolean>(false);
  const [showCvv, setShowCvv] = useState<boolean>(false);

  if (!selectedUserCardDetails) {
    return (
      <StyledInfoSection>
        <CircularProgress data-testid="loading-spinner" />;
      </StyledInfoSection>
    );
  }

  const getDisplayCardNumber = () =>
    showCardNumber
      ? selectedUserCardDetails.number
      : `**** ${selectedUserCardDetails.number?.toString().slice(-4)}`;

  const getDisplayCvv = () => (showCvv ? selectedUserCardDetails.cvv : '***');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const capitalizeFirstLetter = (text: string): string => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  return (
    <StyledInfoSection data-testid="card-info-section">
      <InfoRow
        label={t('statusLabel')}
        value={capitalizeFirstLetter(selectedUserCardDetails.status)}
        status={selectedUserCardDetails.status}
        data-status={selectedUserCardDetails.status}
        data-testid="info-row-card-status"
      />
      <InfoRow
        label={t('holderLabel')}
        value={selectedUserCardDetails.holder}
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
        value={selectedUserCardDetails.iban}
        onCopy={() => copyToClipboard(selectedUserCardDetails.iban)}
        data-testid="info-row-iban"
      />
      <InfoRow
        label={t('swiftLabel')}
        value={selectedUserCardDetails.swift}
        data-testid="info-row-swift-bic"
      />
      <InfoRow
        label={t('dateLabel')}
        value={selectedUserCardDetails.issueDate}
        data-testid="info-row-issue-date"
      />
      <InfoRow
        label={t('rateLabel')}
        value={`${selectedUserCardDetails.cashbackRate}%`}
        data-testid="info-row-cashback-rate"
      />
    </StyledInfoSection>
  );
};

export default InfoTab;
