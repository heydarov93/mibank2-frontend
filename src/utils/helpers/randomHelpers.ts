export const generateRandomParam = () => {
  return `?${Math.random().toString(36).substring(7)}`;
};
