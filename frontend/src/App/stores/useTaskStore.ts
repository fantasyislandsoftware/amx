import { create } from "zustand";
import { TTask } from "../interfaces/task";

export interface TaskStore {
  tasks: TTask[];
  setTasks: (tasks: TTask[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));
