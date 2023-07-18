export const convertStringToArray = (buffer: Buffer) => {
  const lines = buffer.toString().split("\n");
  return lines;
};
