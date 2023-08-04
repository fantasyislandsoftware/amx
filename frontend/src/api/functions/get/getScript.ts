export const getScript = async (name : string) => {
  const response = await fetch(`/getScript?script=${name}`);
  const responseData = await response.json();
  return responseData.data;
};
