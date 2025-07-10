import { useTranslation } from 'react-i18next';
import { createSearchParams } from 'react-router-dom';


import { StyledButtonsContainer } from './SelectView.styled';

import { TransferButton } from 'components/molecules/TransferButton/TransferButton';
import { TRANSFER_METHODS } from 'pages/TransfersPage/TransfersPage';
import { StyledTitle } from 'pages/TransfersPage/TransfersPage.styled';

export const SelectView = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'TransfersPage' });

  return (
    <>
      <StyledTitle variant="h1">{t('title')}</StyledTitle>
      <StyledButtonsContainer>
        {Object.values(TRANSFER_METHODS).map((method) => (
          <TransferButton
            key={method}
            to={{ search: createSearchParams({ method }).toString() }}
            label={t(method)}
            transferMethod={method}
          />
        ))}
      </StyledButtonsContainer>
    </>
  );
};
