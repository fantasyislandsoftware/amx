import { FileInfo } from "../interfaces/fileIO";
import { TScreen } from "../interfaces/screen";
import TTask from "../interfaces/task";
import { workbench } from "../presets/screens";
import { useIntuitionStore } from "../stores/useIntuitionStore";
import { useTaskStore } from "../stores/useTaskStore";

const convertStringToCodeArray = (buffer: Buffer) => {
  const lines = buffer.toString().split("\n");
  let code: string[] = [];
  lines.forEach((line, index) => {
    if (line.startsWith("//")) return;
    code.push(line);
  });
  return code;
};

export const startTask = (fileInfo: FileInfo) => {
  const code: string[] = convertStringToCodeArray(fileInfo.data);
  const tasks = useTaskStore.getState().tasks;
  const task: TTask = {
    id: tasks.length + 1,
    codePointer: 0,
    code: code,
    variables: {},
  };
  tasks.push(task);
};

const jmp = (task: any, label: string) => {
  let index = null;
  for (let i = 0; i < task.code.length; i++) {
    if (task.code[i].startsWith(label)) {
      index = i;
    }
  }
  if (index === null) {
    throw new Error("Label not found");
  }
  task["codePointer"] = index;
};

const openWBScreen = () => {
  const { screens, nextAvailScreenId, setSelectedScreen } =
    useIntuitionStore.getState();
  screens.push(workbench(nextAvailScreenId));
  useIntuitionStore.getState().setScreens(screens);
  //setSelectedScreen(nextAvailScreenId);
};

export const main = (tasks: TTask[], screens: TScreen[], setScreens: any) => {
  tasks.map((task) => {
    let skip = false;
    let command = task.code[task.codePointer];
    if (command.startsWith("//") || command.endsWith(":")) {
      skip = true;
    }
    !skip && eval(command);
    task.codePointer++;
  });

  //screens[0].titleBar.text = Math.random().toString();
  //setScreens([...screens]);
};
