import { useTranslation } from 'react-i18next';

import {
  StyledButtonGroup,
  StyledOutlinedButton,
  StyledPrimaryButton,
} from '../SelectedCardDetails.styled';

const ButtonGroup = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'AllCards.selectedCard',
  });

  return (
    <StyledButtonGroup>
      <StyledPrimaryButton variant="contained">
        {t('transferButton')}
      </StyledPrimaryButton>
      <StyledOutlinedButton variant="outlined">
        {t('putTopButton')}
      </StyledOutlinedButton>
      <StyledOutlinedButton variant="outlined">
        {t('blockButton')}
      </StyledOutlinedButton>
    </StyledButtonGroup>
  );
};

export default ButtonGroup;
