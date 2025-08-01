export interface IPostCodeAddress {
  postcode: string;
}
export interface IPostCodeResponse {
  address: IPostCodeAddress | undefined;
}
