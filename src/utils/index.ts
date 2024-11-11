export const formatNumericWithSpaces = (text: string) => {
  return text.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const firstToUpperCase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const replaceDashesWithSpaces = (text: string) => {
  return text.replaceAll("_", " ");
};

export const normalizeNumber = (data: {
  val: number;
  min: number;
  max: number;
}) => {
  const { val, min, max } = data;
  return (val - min) / (max - min);
};

export const snakeToCamel = (str: string) =>
  str
    .replace(/^_+|_+$/g, "")
    .toLowerCase()
    .replace(/_([a-z])/g, (_match, letter) => letter.toUpperCase());
