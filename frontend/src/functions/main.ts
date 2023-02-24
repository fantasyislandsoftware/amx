import { useEffect } from "react";
import {
  TOpenScreen,
  TSetScreens,
  TSetTasks,
  TSetUpdate,
  TTask,
} from "../types";

export const useUpdate = (setUpdate: TSetUpdate) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setUpdate(Math.random());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
};

export const useTasks = (
  tasks: TTask[],
  update: number,
  setTasks: TSetTasks,
  setScreens: TSetScreens,
  createTask: any,
  openScreen: TOpenScreen
) => {
  useEffect(() => {
    //tasks.map((task: TTask) => {
    //console.log(task.source.code[task.pos]);
    //processCode(task.source.code, task.pos);
    //});

    let newTasks = tasks;
    newTasks.map((task: TTask) => {
      task = processCode(task);
    });
    setTasks(newTasks);
    if (update === 0) {
      createTask(0, setTasks);
      openScreen(setScreens);
    }
  }, [update]);
};

const processCode = (task: TTask) => {
  const el = task.source.code[task.pos].split(" ");
  console.log(el);
  if (el[0] === "jmp") {
    const x = task.source.code.indexOf(`${el[1]}:`);
    if (x !== -1) {
        task.pos = x-1;
      //console.log(x);
    }
  }

  /*  */
  task.pos++;
  //if (task.pos > task.source.code.length - 1) {
  //  task.pos = 0;
  //}
  return task;
  /*const line = code[pos];
  console.log(line);

  const el = line.split(" ");
  if (el[0] === "jmp") {
    const x = code.indexOf(`${el[1]}:`);
    if (x !== -1) {
      //
      //
    }*/
};
