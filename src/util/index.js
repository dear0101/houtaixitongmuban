/**
 * @name toUpperCase
 * @param String
 * @description 首字母大写
 * @returns String
 */
export const toUpperCase = (str = String) => {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};
