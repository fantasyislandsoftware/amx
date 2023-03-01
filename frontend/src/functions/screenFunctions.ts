import { useScreenStore } from "../stores/screenStore";
import { EnumScreenState, TScreen } from "../types";

export const openScreen = (name: string, title: string, parentId: number) => {
  const latestScreenId = useScreenStore.getState().latestScreenId;
  const newScreen: TScreen = {
    props: {
      info: {
        id: latestScreenId,
        parentId: parentId,
        name: "wb",
        title: "Workbench",
        state: EnumScreenState.OPEN,
      },
    },
  };
  const screens = useScreenStore.getState().screens;
  screens.push(newScreen);
  useScreenStore.setState({ screens: screens });
  useScreenStore.setState({ latestScreenId: latestScreenId + 1 });
};

/*
const latestTaskId = useTaskStore.getState().latestTaskId;
  const newTask: TTask = { id: latestTaskId, name: "test", code: viewDir };
  const tasks = useTaskStore.getState().tasks;
  tasks.push(newTask);
  useTaskStore.setState({ tasks: tasks });
  useTaskStore.setState({ latestTaskId: latestTaskId + 1 });
*/
