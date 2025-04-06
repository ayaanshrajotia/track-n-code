/* eslint-disable @typescript-eslint/no-explicit-any */
export const isNullOrEmpty = (value: any): boolean => {
  return value === null || value === undefined || value === "";
};

export const isObjectEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export const isArrayEmpty = (arr: any[]): boolean => {
  return arr.length === 0;
};

export const isStringEmpty = (str: string): boolean => {
  return str.trim() === "";
};

export const isVariableObject = (variable: any): boolean => {
  return (
    typeof variable === "object" &&
    variable !== null &&
    !Array.isArray(variable)
  );
};
