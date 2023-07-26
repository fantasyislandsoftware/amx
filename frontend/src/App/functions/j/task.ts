import { useTaskStore } from "../../stores/useTaskStore";

export const getTaskState = (id: number) => {
    const tasks = useTaskStore.getState().tasks;
    let state: any = undefined;
    tasks.map((task) => {
      if (task.id === id) {
        state = task.state;
      }
    });
    return state;
  };