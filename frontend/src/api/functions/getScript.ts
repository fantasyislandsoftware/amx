export const getScript = async (name : string) => {
  const response = await fetch(`http://localhost:9001/getScript?script=${name}`);
  const responseData = await response.json();
  return responseData.data;
};
