import { FieldError } from 'react-hook-form';

export function getFieldErrorMessage(error: FieldError | undefined) {
  return error?.message ?? '';
}
