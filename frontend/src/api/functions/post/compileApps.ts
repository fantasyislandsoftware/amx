export const compileApps = async () => {
  const response = await fetch(`http://localhost:9001/compileApps`, {
    method: "POST",
  });
  const responseData = await response.json();
  return responseData.data;
};
