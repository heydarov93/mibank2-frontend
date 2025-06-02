import { useTranslation } from 'react-i18next';

import { StyledBtnRow, StyledActionBtn } from '../DepositCreationForm.styled';

interface FormButtonsProps {
  modal?: boolean;
  onCloseModal?: () => void;
  isDisabled: boolean;
}

const FormButtons = ({ modal, onCloseModal, isDisabled }: FormButtonsProps) => {
  const { t } = useTranslation('translation', { keyPrefix: 'LearnMorePage' });

  return (
    <StyledBtnRow>
      {modal && (
        <StyledActionBtn
          variant="outlined"
          sx={{ marginRight: '25px', width: '113px' }}
          onClick={onCloseModal}
        >
          {t('cancelDeposit')}
        </StyledActionBtn>
      )}
      <StyledActionBtn variant="contained" type="submit" disabled={isDisabled}>
        {t('openDeposit')}
      </StyledActionBtn>
    </StyledBtnRow>
  );
};

export default FormButtons;
