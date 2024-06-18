import { useTranslation } from 'react-i18next';

export const useFormatErrorMessage = () => {
  const { t } = useTranslation();

  const formatErrorMessage = (
    remainingAttempts: number,
    message: string,
  ): string => {
    const attemptsMessage = t('LoginPage.attemptWithCount', {
      count: remainingAttempts,
    });
    return `${attemptsMessage}\n${message}`;
  };

  return { formatErrorMessage };
};
