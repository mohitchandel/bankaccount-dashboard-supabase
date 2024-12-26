export const formatDollarValue = (value: string): string => {
  const numericValue = parseFloat(value);
  if (isNaN(numericValue)) {
    return "Invalid number";
  }
  return numericValue.toLocaleString("en-US");
};
