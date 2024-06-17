import { useTranslation } from 'react-i18next';

export const useFormatErrorMessage = () => {
  const { t } = useTranslation();

  const formatErrorMessage = (
    remainingAttempts: number,
    message: string,
  ): string => {
    const attemptsLeftText =
      remainingAttempts === 1
        ? t('LoginPage.moreAttemptLeft')
        : t('LoginPage.moreAttemptsLeft');
    return `${remainingAttempts} ${attemptsLeftText}\n${message}`;
  };

  return { formatErrorMessage };
};
