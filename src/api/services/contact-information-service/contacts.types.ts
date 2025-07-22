import { CONTACT_TAGS } from 'constants/api/tags';

export type TContactTag = (typeof CONTACT_TAGS)[keyof typeof CONTACT_TAGS];
