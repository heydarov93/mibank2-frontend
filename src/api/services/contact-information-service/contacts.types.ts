import { CONTACT_TAGS } from 'api/constants/tags';

export type TContactTag = (typeof CONTACT_TAGS)[keyof typeof CONTACT_TAGS];
