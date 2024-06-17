 export const formatErrorMessage = (
  remainingAttempts: number,
  message: string,
): string => {
  const attemptWord = remainingAttempts === 1 ? 'attempt' : 'attempts';
  const attemptsMessage = `${remainingAttempts} more ${attemptWord} left.`;
  return `  ${attemptsMessage}
  ${message}`;
};
