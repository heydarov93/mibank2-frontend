import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { EditCorporateAddressForm } from '../EditCorporateAddressForm/EditCorporateAddressForm';
import { OpenBusinessAccountForm } from '../OpenBusinessAccountForm/OpenBusinessAccountForm';

import { StyledDialog } from './OpenBusinessAccountModal.styled';

import {
  ModalHeader,
  NavigationWarningModal,
} from 'components/atoms';
import { EOpenBusinessAccStepper } from 'enums/EOpenBusinessAccStepper';
import { useBusinessAccFlow } from 'hooks/useOpenBusinessAccFlow';

export interface OpenBusinessAccountModalProps {
  open: boolean;
  onClose: () => void;
}

export const OpenBusinessAccountModal = ({
  open,
  onClose,
}: OpenBusinessAccountModalProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'OpenBusinessAccountModal',
  });
  const {
    step,
    formMethods,
    confirmationModal,
    handleClose,
    handleEdit,
    handleBack,
  } = useBusinessAccFlow({
    onClose,
  });
  const isEditingAddress = step === EOpenBusinessAccStepper.EDIT_ADDRESS;
  const isDataFilled = step === EOpenBusinessAccStepper.DATA_FILLED;
  const headerTitle = t(isEditingAddress ? 'editAddressTitle' : 'title');

  return (
    <StyledDialog
      open={open}
      onClose={confirmationModal.open}
      data-testid="open-business-acc-modal"
    >
      <ModalHeader
        title={headerTitle}
        onClose={confirmationModal.open}
        onBack={isEditingAddress ? handleBack : undefined}
      />

      {isEditingAddress && <EditCorporateAddressForm sx={{ mt: 3 }} />}

      {!isEditingAddress && (
        <FormProvider {...formMethods}>
          <OpenBusinessAccountForm
            isDataFilled={isDataFilled}
            onCancel={confirmationModal.open}
            // TODO add submit logic when api is ready
            onSubmit={(e) => e.preventDefault()}
            onEdit={handleEdit}
          />
        </FormProvider>
      )}

      <NavigationWarningModal
        open={confirmationModal.isOpen}
        title={t('confirmationModal.title')}
        description={t('confirmationModal.description')}
        cancelLabel={t('confirmationModal.goBack')}
        confirmLabel={t('confirmationModal.leave')}
        onConfirm={handleClose}
        onCancel={confirmationModal.close}
        sx={(theme) => ({
          '.MuiTypography-root': {
            color: theme.palette.grey[600],
          },
        })}
      />
    </StyledDialog>
  );
};
