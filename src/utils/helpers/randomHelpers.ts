export const generateRandomParam = (): string => {
  return `?${Math.random().toString(36).substring(7)}`;
};
