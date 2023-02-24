import { viewDir } from "../scripts/viewDir";
import { TTask } from "../types";

export const createTask = (id: number, setTasks: (tasks: any) => void) => {
  setTasks((tasks: TTask[]) => [
    ...tasks,
    { id: id, name: "test", source: viewDir, pos: 0 },
  ]);
};
