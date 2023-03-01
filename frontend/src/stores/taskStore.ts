import { create, StoreApi, UseBoundStore } from "zustand";
import { TTask } from "../types";

export type UseTaskStore = {
  latestTaskId: number;
  tasks: TTask[];
};

export const useTaskStore: UseBoundStore<StoreApi<UseTaskStore>> = create(() => ({
  latestTaskId: 0,
  tasks: [],
}));
