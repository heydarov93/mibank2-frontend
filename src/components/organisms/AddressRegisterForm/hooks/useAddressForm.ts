import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { TO_WELCOME } from 'constants/routesName';
import { EWelcomeTab } from 'enums/EWelcomeTab';
import { ILegalAddress } from 'models/IRegistration';
import { addressRegisterFormSchema } from 'validation/addressRegisterFormSchema';

export const useAddressForm = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'BusinessLoginPage',
  });
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<ILegalAddress>({
    resolver: yupResolver(addressRegisterFormSchema),
    defaultValues: {
      country: t('form.defaultCountryName'),
      city: '',
      street: '',
      building: '',
      office: '',
      postcode: '',
    },
    mode: 'all',
  });

  // TODO: substitute with real submit when Api is ready
  const onSubmit = () => {
    try {
      reset();
      navigate(`${TO_WELCOME}?tab=${EWelcomeTab.Business}`);
    } catch (e) {
      //
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    isValid,
  };
};
