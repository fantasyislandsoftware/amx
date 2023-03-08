import { useEffect } from "react";
import { EnumCodeType, EnumFuncName, TSetUpdate, TTask } from "../types";
import { createTask } from "./taskFunctions";
import { openWindow } from "./windowFunctions";
import { openScreen } from "./screenFunctions";
import { useTaskStore } from "../stores/taskStore";
import { workbenchScript } from "../scripts/workbenchScript";
import { fileManagerScript } from "../scripts/fileManagerScript";
import { jmp } from "./general";

export const useUpdate = (setUpdate: TSetUpdate) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate(Math.random());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
};

export const useTasks = (update: number) => {
  useEffect(() => {
    let tasks = useTaskStore.getState().tasks;
    tasks.map((task: TTask) => {
      task = processCode(task);
    });

    useTaskStore.setState({ tasks: tasks });
    if (update === 0) {
      createTask("wb", {
        type: EnumCodeType.SCRIPT,
        codePointer: 0,
        script: { name: "workbench", lines: [] },
      });
      createTask("filemanager", {
        type: EnumCodeType.SCRIPT,
        codePointer: 0,
        script: { name: "fileManager", lines: [] },
      });
      createTask("filemanager", {
        type: EnumCodeType.SCRIPT,
        codePointer: 0,
        script: { name: "fileManager", lines: [] },
      });
    }
  }, [update]);
};

const processFunction = (task: TTask, funcName: string, params: string[]) => {
  for (let n = 0; n < params.length; n++) {
    params[n] = params[n].replace(/"/g, '').trim();
  }
  //console.log(funcName);
  switch (funcName) {
    case EnumFuncName.openWBScreen:
      openScreen("Workbench", "wb", task.id);
      break;
    case EnumFuncName.openWBWindow:
      console.log(params);
      openWindow("File explorer", "file_explorer", 0);
      break;
    case EnumFuncName.jmp:
      task = jmp(task, params[0]);
      break;
    default:
  }
  return task;
};

const processCode = (task: TTask) => {
  /* Get current line */
  const line = task.code.script.lines[task.code.codePointer];
  //console.log(line);

  if (line) {
    /* Function of label? */
    if (line.indexOf("(") > -1 || line.indexOf(")") > -1) {
      /* Get function params */
      const start = line.indexOf("(");
      const end = line.indexOf(")");
      const funcName = line.substring(0, start);
      const params_str = line.substring(start + 1, end).trim();
      let params: string[] = [];
      if (params_str.length > 0) {
        params = params_str.split(",");
      }
      task = processFunction(task, funcName, params);
    }
    if (line.search(":")) {
      //console.log("label");
    }
  }

  /*  */
  task.code.codePointer++;
  return task;
};
