type TTask = {
  id: number;
  codePointer: number;
  code: string[];
  variables: { [key: string]: any };
};

export default TTask;
