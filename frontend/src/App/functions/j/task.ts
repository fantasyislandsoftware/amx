import { EnumIntuitionGadgetType } from "../../interfaces/generic";
import { EnumTaskState } from "../../interfaces/task";
import { useTaskStore } from "../../stores/useTaskStore";
import { closeWindowByUniqueId } from "./window";

export const getTaskState = (id: number) => {
  const tasks = useTaskStore.getState().tasks;
  let state: any = undefined;
  tasks.map((task) => {
    if (task !== null) {
      if (task.id === id) {
        state = task.state;
      }
    }
  });
  return state;
};

export const killTask = (id: number) => {
  const { tasks } = useTaskStore.getState();
  tasks.map((task, index) => {
    if (task !== null) {
      if (task.id === id) {
        /* Close all windows */
        task.objects.map((object) => {
          if (object.type === EnumIntuitionGadgetType.Window) {
            closeWindowByUniqueId(object.uniqueId);
          }
        });
        /* Close all screens */

        /* Close task */
        tasks[index].state = EnumTaskState.Ended;
      }
    }
  });
  useTaskStore.setState({ tasks: tasks });
};

export const getTasks = () => {
  return useTaskStore.getState().tasks;
};
