import { OFFER_TAGS } from 'api/constants/tags';

export interface IOffer {
  name: string;
  description: string;
  banner: string;
}

export interface IGetOffersParams {
  page: number;
  size: number;
}

export interface IGetOfferPageResponse {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: IOffer[];
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export interface IGetOfferImagesResponse {
  imageFiles: string[];
}

export type TOfferTag = (typeof OFFER_TAGS)[keyof typeof OFFER_TAGS];
