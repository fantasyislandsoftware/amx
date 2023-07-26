export const equals = (a: any, b: any) => {
  return a === b;
};

export const endLoop = (task: any, label: string, cflag: boolean) => {
  let index = task.codePointer;
  task.code.map((line: string, i: number) => {
    if (line === `beginLoop("${label}");` && cflag) {
      index = i;
      return;
    }
  });
  task.codePointer = index;
};
