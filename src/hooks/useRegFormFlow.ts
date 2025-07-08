import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ObjectSchema } from 'yup';

import { useAppDispatch } from './useAppDispatch';
import useDisclosure from './useDisclosure';

import { usePostRegistrationInfoMutation } from 'api/services/user-account-service/user-accounts.api';
import { TO_HOME, TO_SIGN_IN } from 'constants/routesName';
import { EErrorStatus } from 'enums';
import { EStepper } from 'enums/EStepper';
import { IErrorData } from 'models/IError';
import { IPersonalInfo } from 'models/IRegistration';
import { IRegistrationForApi } from 'models/IRegistrationForApi';
import { setError } from 'store/reducers';
import { checkEUStatus } from 'utils/checkers/EUStatusChecker';
import {
  TUserAddressRegisterValues,
  TUserDocumentInfoValues,
  TUserLegalStatusValues,
  userAddressRegisterSchema,
  userDocumentInfoSchema,
  userLegalStatusSchema,
  userPersonalInfoSchema,
} from 'validation';

const resolvers: Record<EStepper, ObjectSchema<object>> = {
  [EStepper.PERSONAL_INFO]: userPersonalInfoSchema,
  [EStepper.LEGAL_STATUS]: userLegalStatusSchema,
  [EStepper.DOCUMENT_INFO]: userDocumentInfoSchema,
  [EStepper.ADDRESS]: userAddressRegisterSchema,
};

type RegFormData = IPersonalInfo &
  TUserLegalStatusValues &
  TUserDocumentInfoValues &
  TUserAddressRegisterValues;

const defaultValues: RegFormData = {
  apartment: '',
  building: '',
  citizenship: '',
  city: '',
  dateOfBirth: '',
  documentNumber: '',
  expirationDate: '',
  issueDate: '',
  name: '',
  peselNumber: '',
  phoneNumber: '',
  phoneCode: '',
  postcode: '',
  street: '',
  surname: '',
  taxResidenceCountry: '',
};

const stepsSequence = [
  EStepper.PERSONAL_INFO,
  EStepper.LEGAL_STATUS,
  EStepper.DOCUMENT_INFO,
  EStepper.ADDRESS,
] as const;

const formatDate = (date: string | Date) => dayjs(date).format('YYYY-MM-DD');

export const useRegFormFlow = () => {
  const { t } = useTranslation('translation');
  const [step, setStep] = useState(EStepper.PERSONAL_INFO);
  const dispatch = useAppDispatch();
  const leaveModal = useDisclosure();
  const [postRegistrationInfo] = usePostRegistrationInfoMutation();
  const formMethods = useForm<RegFormData>({
    resolver: yupResolver(resolvers[step] as ObjectSchema<RegFormData>),
    defaultValues,
    mode: 'all',
    reValidateMode: 'onSubmit',
  });
  const { handleSubmit, trigger, reset, getValues } = formMethods;

  const navigate = useNavigate();

  const submitForm = handleSubmit(async (data: RegFormData) => {
    const isStepValid = await trigger();

    if (!isStepValid) return;

    const nextStep: EStepper | undefined =
      stepsSequence[stepsSequence.indexOf(step) + 1];

    if (nextStep) {
      reset({ ...getValues() }, { keepValues: true });
      setStep(nextStep);
    } else {
      await postRegistrationInfoFunction(data);
    }
  });

  const handleConfirm = () => {
    leaveModal.close();
    localStorage.clear();
    navigate(TO_SIGN_IN);
  };

  const handleBack = () => {
    setStep(stepsSequence.indexOf(step) - 1);
    queueMicrotask(trigger);
  };

  const createDataForApi = (formData: RegFormData): IRegistrationForApi => {
    return {
      personalInfo: {
        firstName: formData.name,
        lastName: formData.surname,
        citizenship: formData.citizenship,
        phoneNumber: String(formData.phoneNumber),
        phoneCode: formData.phoneCode,
        taxResidenceCountry: formData.taxResidenceCountry,
        pesel: formData.peselNumber,
        birthDate: formatDate(formData.dateOfBirth),
      },
      address: {
        city: formData.city,
        street: formData.street,
        building: formData.building,
        apartment: formData.apartment,
        postCode: formData.postcode.replace('-', ''),
      },
      document: {
        number: formData.documentNumber,
        issueDate: formatDate(formData.issueDate),
        expiryDate: formatDate(formData.expirationDate),
        documentType: checkEUStatus(formData.citizenship) ? 'EU' : 'NON_EU',
      },
      registrationDate: formatDate(new Date()),
    };
  };

  const postRegistrationInfoFunction = async (data: RegFormData) => {
    try {
      if (data) {
        const apiData = createDataForApi(data);
        await postRegistrationInfo(apiData).unwrap();
        navigate(TO_HOME);
      } else {
        throw new Error("You don't have data");
      }
    } catch (e) {
      const error = e as IErrorData;
      switch (error.status) {
        case EErrorStatus.SERVER_ERROR:
          dispatch(setError(t('RegistrationPage.errorServerUnacceptable')));
          break;
        case EErrorStatus.BAD_REQUEST:
          dispatch(setError(t('RegistrationPage.errorBadRequest')));
          break;
        default:
          dispatch(setError(t('LoginPage.serverError')));
          break;
      }
    }
  };

  return {
    submitForm,
    handleConfirm,
    handleBack,
    leaveModal,
    formMethods,
    step,
  };
};
