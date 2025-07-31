export const copyToClipboard = (value: string | number) => {
  navigator.clipboard.writeText(value.toString());
};
