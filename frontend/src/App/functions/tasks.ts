import { FileInfo } from "../interfaces/fileIO";
import { TScreen } from "../interfaces/screen";
import { TTask, EnumTaskState } from "../interfaces/task";
import { TWindow } from "../interfaces/window";
import { workbench } from "../presets/screens";
import { useIntuitionStore } from "../stores/useIntuitionStore";
import { useTaskStore } from "../stores/useTaskStore";
import { convertStringToArray } from "./arrayHandlers";
import { CloseButton, OrderButton } from "../presets/buttons";
import { loadFile } from "./fileIO";

const filterCode = (code: string[]) => {
  let result: string[] = [];
  code.map((line) => {
    line = line.trim();
    if (line.startsWith("//")) return;
    if (line.endsWith(":")) line = `/*${line}*/`;
    if (line === "") return;
    result.push(line);
  });
  return result;
};

const startJS = (data: any) => {
  const code: string[] = filterCode(convertStringToArray(data));
  const tasks = useTaskStore.getState().tasks;
  const id = tasks.length + 1;
  const task: TTask = {
    id: id,
    codePointer: 0,
    code: code,
    state: EnumTaskState.Running,
  };
  tasks.push(task);
  return id;
};

export const startTask = async (path: string) => {
  const fileInfo: FileInfo = await loadFile(path);
  if (fileInfo.type === "unknown") {
    return startJS(fileInfo.data);
  }
};

const getTaskState = (id: number) => {
  const tasks = useTaskStore.getState().tasks;
  let state: any = undefined;
  tasks.map((task) => {
    if (task.id === id) {
      state = task.state;
    }
  });
  return state;
};

const jmp = (task: any, label: string) => {
  let index = null;
  for (let i = 0; i < task.code.length; i++) {
    if (task.code[i] === `/*${label}:*/`) {
      index = i;
    }
  }
  if (index === null) {
    throw new Error("Label not found");
  }
  task.codePointer = index - 1;
};

const openWBScreen = () => {
  const { screens, nextAvailScreenId, setSelectedScreen } =
    useIntuitionStore.getState();
  screens.push(workbench(nextAvailScreenId));
  useIntuitionStore.getState().setScreens(screens);
};

const openWindow = (
  x: number,
  y: number,
  width: number,
  height: number,
  title: string,
  buttons: { order: boolean; close: boolean }
) => {
  const { screens, setScreens, publicScreen } = useIntuitionStore.getState();
  const closeButton = new CloseButton();
  const orderButton = new OrderButton();
  const window: TWindow = {
    id: 1,
    x: x,
    y: y,
    width: width,
    height: height,
    titleBar: {
      text: title,
      buttons: [
        buttons.close && closeButton.get(),
        buttons.order && orderButton.get(),
      ],
    },
    zOrder: 2,
  };
  const screenIndex = screens.findIndex((screen) => screen.id === publicScreen);
  screens[screenIndex].windows.push(window);
  setScreens(screens);
};

const loadScript = async (path: string) => {
  const fileInfo: FileInfo = await loadFile(path);
  return convertStringToArray(fileInfo.data);
};

const processCommand = (task: any, command: string) => {
  eval(command);
};

export const runTasks = (screens: TScreen[], setScreens: any) => {
  const { tasks, setTasks } = useTaskStore.getState();
  tasks.map((task) => {
    if (task.state === EnumTaskState.Stopped) return;
    let command = task.code[task.codePointer];
    processCommand(task, command);

    if (task.codePointer === task.code.length - 1) {
      task.state = EnumTaskState.Stopped;
      task.code = [];
    }
    task.codePointer++;
  });
  setTasks(tasks);
};
