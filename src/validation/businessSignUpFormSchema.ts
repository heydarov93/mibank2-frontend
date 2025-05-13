import * as yup from 'yup';

import { REG_EXP } from './regExp';

import i18n from 'i18n';

const key = 'BusinessSignUpPage.form.error';
const requiredField = `${key}.required`;

export const businessSignUpFormSchema = yup.object().shape({
  companyName: yup
    .string()
    .trim()
    .transform((value) => value?.replace(/\s+/g, ''))
    .matches(
      /^[A-Za-z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ'.,\\/&()\\+\-\s]+$/,
      i18n.t(`${key}.invalidPattern`),
    )
    .max(100, i18n.t(`${key}.maxLen`))
    .required(i18n.t(requiredField)),
  nip: yup
    .string()
    .trim()
    .transform((value) => value?.replace(/\s+/g, ''))
    .matches(/^PL-NIP-\d{10}$/, i18n.t(`${key}.nipPattern`))
    .required(i18n.t(requiredField)),
  companyEmail: yup
    .string()
    .trim()
    .matches(REG_EXP.emailRegExp, i18n.t(`${key}.emailPattern`))
    .max(320, i18n.t(`${key}.emailMaxLen`))
    .required(i18n.t(requiredField)),
  ownerName: yup
    .string()
    .trim()
    .max(100, i18n.t(`${key}.maxLen`))
    .matches(
      REG_EXP.fullPolishNameWithAtLeastTwoWords,
      i18n.t(`${key}.ownerNamePattern`),
    )
    .required(i18n.t(requiredField)),
});
