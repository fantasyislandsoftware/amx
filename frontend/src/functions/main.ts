import { useEffect } from "react";
import { EnumCodeType, TSetUpdate, TTask } from "../types";
import { createTask } from "./taskFunctions";
import { openWindow } from "./windowFunctions";
import { openScreen } from "./screenFunctions";
import { useTaskStore } from "../stores/taskStore";
import { workbenchScript } from "../scripts/workbenchScript";
import { fileManagerScript } from "../scripts/fileManagerScript";

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
      /*createTask("filemanager", {
        type: EnumCodeType.SCRIPT,
        codePointer: 0,
        scriptName: "fileManager",
      });
      createTask("filemanager2", {
        type: EnumCodeType.SCRIPT,
        codePointer: 0,
        scriptName: "fileManager",
      });*/
    }
  }, [update]);
};

const processCode = (task: TTask) => {
  /* Get current line */
  const line = task.code.script.lines[task.code.codePointer];
  //console.log(line);

  if (line) {
    /* Function of label? */

    if (line.search("\\(") || line.search("\\)")) {
      console.log("function");
    }
    if (line.search(":")) {
      console.log("label");
    }
  }

  //console.log(task.code.codePointer);

  /*const el = task.code.script[task.code.codePointer].split(" ");
  if (el[0] === "openWBWindow") {
    openWindow("FileManager", "filemanager", null);
  }
  if (el[0] === "openWBScreen") {
    openScreen("Workbench", "wb", task.id);
  }
  if (el[0] === "jmp") {
    const x = task.code.script.indexOf(`${el[1]}:`);
    if (x !== -1) {
      task.code.codePointer = x - 1;
    }
  }*/

  /*  */
  task.code.codePointer++;
  return task;
};
