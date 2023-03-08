import { TTask } from "../types";

export const jmp = (task: TTask, label: string) => {
  const index = task.code.script.lines.indexOf(`${label}:`);
  if (index > -1) {
    task.code.codePointer = index;
  }
  return task;
};
