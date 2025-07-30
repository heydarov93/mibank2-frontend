import * as yup from 'yup';

import { t } from 'config';

const VALIDATION_KEY = 'OpenBusinessAccountModal.errors';
const requiredField = `${VALIDATION_KEY}.requiredField`;

export const businessAccountOptionsSchema = yup.object().shape({
  currency: yup.string().required(t(requiredField)),
  cardIssuer: yup.string().required(t(requiredField)),
  issueType: yup.string().required(t(requiredField)),
});

export const openBusinessAccountSchema = yup
  .object()
  .shape({
    addressConfirmed: yup
      .bool()
      .oneOf([true], t(`${VALIDATION_KEY}.confirmAddress`)),
    termsAccepted: yup
      .bool()
      .oneOf([true], t(`${VALIDATION_KEY}.termsAccepted`)),
  })
  .concat(businessAccountOptionsSchema);

export type TOpenBusinessAccountValues = yup.InferType<
  typeof openBusinessAccountSchema
>;
