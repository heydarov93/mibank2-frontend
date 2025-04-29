export interface SavedAccount {
  id: string;
  label: string;
  number: string;
  issuer?: 'visa' | 'mastercard';
}
