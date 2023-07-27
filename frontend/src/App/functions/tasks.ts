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
import {
  getTaskState as _getTaskState,
  killTask as _killTask,
  getTasks as _getTasks,
} from "./j/task";
import { endLoop as _endLoop } from "./j/logic";
import { openWindow as _openWindow } from "./j/window";
import { getPublicScreenId as _getPublicScreenId } from "./j/screen";

const equals = _equals;
const beginLoop = Function;
const endLoop = _endLoop;
const getTaskState = _getTaskState;
const getTasks = _getTasks;
const killTask = _killTask;
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

const convertScriptToJS = (parentId: number, script: string) => {
  const commands = ["loadwb", "endcli"];
  commands.map((command: string) => {
    //@ts-ignore
    script = script.replaceAll(
      command,
      `task.result = startTask(${parentId},"/src/amxjs/${command}.js");`
    );
  });
  const lines = convertStringToArray(script);
  return lines;
};

const startJS = (parentId: number, data: any, params: string) => {
  const code: string[] = filterCode(convertStringToArray(data.toString()));
  const tasks = useTaskStore.getState().tasks;
  const id = tasks.length + 1;
  const task: TTask = {
    id: id,
    parentId: parentId,
    codePointer: 0,
    code: code,
    params: params,
    state: EnumTaskState.Running,
    objects: [],
  };
  tasks.push(task);
  return id;
};

export const startTask = async (
  parentId: number,
  path: string,
  params: string
) => {
  const fileInfo: FileInfo = await loadFile(path);
  if (fileInfo.type === "unknown") {
    return startJS(parentId, fileInfo.data, params);
  }
};

const openWBScreen = () => {
  const { screens, nextAvailScreenId, setSelectedScreen } =
    useIntuitionStore.getState();
  screens.push(workbench(nextAvailScreenId));
  useIntuitionStore.getState().setScreens(screens);
};

const loadScript = (path: string) => {
  const file = loadFile(path);
  return makeQuerablePromise(file);
};
const processCommand = (task: TTask, command: string) => {
  eval(command);
};

export const runTasks = (screens: TScreen[], setScreens: any) => {
  const { tasks, setTasks } = useTaskStore.getState();
  tasks.map((task) => {
    if (task !== null) {
      if (task.state === EnumTaskState.Stopped) return;
      let command = task.code[task.codePointer];
      processCommand(task, command);

      if (task.codePointer === task.code.length - 1) {
        task.state = EnumTaskState.Stopped;
        task.code = [];
      }
      task.codePointer++;
    }
  });
  setTasks(tasks);
};
