import * as yup from 'yup';

import { t } from 'i18n';
import { isValidPeselLength } from 'utils/validationUtils';

const VALIDATION_KEY = 'RegistrationPage';
const requiredField = `${VALIDATION_KEY}.requiredField`;

export const userLegalStatusSchema = yup.object().shape({
  peselNumber: yup
    .string()
    .typeError(t(requiredField))
    .required(t(requiredField))
    .test('len', t(`${VALIDATION_KEY}.errorPeselDigits`), isValidPeselLength),
  citizenship: yup.string().required(t(requiredField)),
  taxResidenceCountry: yup.string().required(t(requiredField)),
});

export type TUserLegalStatusValues = yup.InferType<
  typeof userLegalStatusSchema
>;
