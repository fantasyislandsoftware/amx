export const clearNulls = (json: any): any => {
  const result = json.filter((item: any) => {
    return item !== null;
  });
  return result;
};
