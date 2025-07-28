import { useTranslation } from 'react-i18next';

import { StyledFlexRow, StyledTitle } from './TransferView.styled';
import { TransferMethodMenu } from './molecules';

import { TransferForm } from 'components/organisms';
import { TTransferMethod } from 'types/types';

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
