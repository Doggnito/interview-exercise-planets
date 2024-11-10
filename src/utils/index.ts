export const addSpacesToNumber = (text: string) => {
  return text.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const firstToUpperCase = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const replaceDashesWithSpaces = (text: string) => {
  return text.replace("_", " ");
};

export const normalizeNumber = (val: number, min: number, max: number) => {
  return (val - min) / (max - min);
};
