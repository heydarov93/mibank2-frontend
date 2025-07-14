import { EMPLOYEE_TAGS } from 'api/constants/tags';
import { TId } from 'types/types';

interface IEmployeeApiRequest {
  code: string;
  email: string;
}

interface IEmployeeApiResponse {
  message: string;
}

export interface IRegisterEmployeeRequest {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dateAdded: string;
}

export interface IAuthenticateEmployeeResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IGetAuthenticateEmployeeResponse {
  qrCodeBaseUrl: string;
  email: string;
}

export interface IGetEmployeeListResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dateAdded: string;
}

export interface IGetEmployeeListRequest {
  page: string;
  count: string;
  sortDateAdded: string;
  sortLastName: string;
  firstName: string;
  lastName: string;
}

export interface IUpdateEmployee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dateAdded: string;
}

export interface IGetEmployeeListRequest {
  page: string;
  count: string;
  sortDateAdded: string;
  sortLastName: string;
  firstName: string;
  lastName: string;
}

export interface IGetEmployeeListResponse {
  data: IUpdateEmployee[];
  totalElements: number;
}

export type TDeleteEmployeeRequest = TId;
export type TValidateOTPRequest = IEmployeeApiRequest;
export type TAuthenticateEmployeeRequest = IEmployeeApiRequest;
export type TValidateOTPResponse = IEmployeeApiResponse;
export type TRegisterEmployeeResponse = IEmployeeApiResponse;
export type TValidateEmployeeEmailResponse = IEmployeeApiResponse;
export type TUpdateEmployeeResponse = Partial<IUpdateEmployee>;
export type TUpdateEmployeeRequest = Partial<IUpdateEmployee>;
export type TEmployeeTag = (typeof EMPLOYEE_TAGS)[keyof typeof EMPLOYEE_TAGS];
