import { TUserBankCardDetails } from "types/types";

export const getDisplayCardNumber = (
  selectedUserCardDetails: TUserBankCardDetails,
  showCardNumber: boolean,
): string | number =>
  showCardNumber
    ? selectedUserCardDetails.number
    : `**** ${selectedUserCardDetails.number?.toString().slice(-4)}`;

export const getDisplayCvv = (
  selectedUserCardDetails: TUserBankCardDetails,
  showCvv: boolean,
): string | number => (showCvv ? selectedUserCardDetails.cvv : '***');

export const copyToClipboard = (value: string | number) => {
  navigator.clipboard.writeText(value.toString());
};

export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};
