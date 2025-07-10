import { useTranslation } from 'react-i18next';

import { StyledFlexRow } from './TransferView.styled';

import { TransferForm } from 'components/organisms/TransferForm/TransferForm';
import { TransferMethodMenu } from 'components/organisms/TransferMethodMenu/TransferMethodMenu';
import { TTransferMethod } from 'pages/TransfersPage/TransfersPage';
import { StyledTitle } from 'pages/TransfersPage/TransfersPage.styled';

interface TransferViewProps {
  transferMethod: TTransferMethod;
  onCancel: () => void;
}

export const TransferView = ({
  transferMethod,
  onCancel,
}: TransferViewProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });

  return (
    <>
      <StyledFlexRow display="flex" alignItems="center" gap={1}>
        <StyledTitle variant="h1">{t('formTitle')}</StyledTitle>
        <TransferMethodMenu />
      </StyledFlexRow>
      <TransferForm key={transferMethod} onCancel={onCancel} />
    </>
  );
};
