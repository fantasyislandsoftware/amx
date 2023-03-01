import { useTaskStore } from "../stores/taskStore";
import { EnumCodeType, TCode, TScript, TTask } from "../types";

export const createTask = (name : string, code : TCode) => {
  const latestTaskId = useTaskStore.getState().latestTaskId;
  const newTask: TTask = { id: latestTaskId, name: name, code: code };
  const tasks = useTaskStore.getState().tasks;
  tasks.push(newTask);
  useTaskStore.setState({ tasks: tasks });
  useTaskStore.setState({ latestTaskId: latestTaskId + 1 });
};
