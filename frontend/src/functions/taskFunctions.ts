import { getScript } from "../api/functions/getScript";
import { useTaskStore } from "../stores/taskStore";
import { TCode, TTask } from "../types";

export const createTask = async (name: string, code: TCode) => {
  code.script.lines = await getScript(code.script.name);
  const latestTaskId = useTaskStore.getState().latestTaskId;
  const newTask: TTask = { id: latestTaskId, name: name, code: code };
  const tasks = useTaskStore.getState().tasks;
  tasks.push(newTask);
  useTaskStore.setState({ tasks: tasks });
  useTaskStore.setState({ latestTaskId: latestTaskId + 1 });
};
