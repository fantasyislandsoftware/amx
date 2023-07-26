import { FileInfo } from "../interfaces/fileIO";
import { TScreen } from "../interfaces/screen";
import { TTask, EnumTaskState } from "../interfaces/task";
import { workbench } from "../presets/screens";
import { useIntuitionStore } from "../stores/useIntuitionStore";
import { useTaskStore } from "../stores/useTaskStore";
import { convertStringToArray } from "./arrayHandlers";
import { loadFile } from "./fileIO";
import { makeQuerablePromise } from "./promiseHandlers";
import { equals as _equals } from "./j/logic";
import { getTaskState as _getTaskState } from "./j/task";
import { endLoop as _endLoop } from "./j/logic";
import { openWindow as _openWindow } from "./j/window";
import { getPublicScreenId as _getPublicScreenId } from "./j/screen";

const equals = _equals;
const beginLoop = Function;
const endLoop = _endLoop;
const getTaskState = _getTaskState;
const openWindow = _openWindow;
const getPublicScreenId = _getPublicScreenId;

const filterCode = (code: string[]) => {
  let result: string[] = [];
  code.map((line) => {
    line = line.trim();
    if (line.startsWith("//") || line.startsWith("/*")) return;
    if (line.endsWith(":")) line = `/*${line}*/`;
    if (line === "") return;
    result.push(line);
  });
  return result;
};

const convertScriptToJS = (script: string) => {
  const commands = ["loadwb", "endcli"];
  commands.map((command: string) => {
    //@ts-ignore
    script = script.replaceAll(
      command,
      `task.result = startTask("/src/amxjs/${command}.js");`
    );
  });
  const lines = convertStringToArray(script);
  return lines;
};

const startJS = (data: any, params: string) => {
  const code: string[] = filterCode(convertStringToArray(data.toString()));
  const tasks = useTaskStore.getState().tasks;
  const id = tasks.length + 1;
  const task: TTask = {
    id: id,
    codePointer: 0,
    code: code,
    params: params,
    state: EnumTaskState.Running,
  };
  tasks.push(task);
  return id;
};

export const startTask = async (path: string, params: string) => {
  const fileInfo: FileInfo = await loadFile(path);
  if (fileInfo.type === "unknown") {
    return startJS(fileInfo.data, params);
  }
};

const openWBScreen = () => {
  const { screens, nextAvailScreenId, setSelectedScreen } =
    useIntuitionStore.getState();
  screens.push(workbench(nextAvailScreenId));
  useIntuitionStore.getState().setScreens(screens);
};

const loadScript = (path: string) => {
  const x = loadFile(path);
  return makeQuerablePromise(x);
};
const processCommand = (task: TTask, command: string) => {
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
