import React, { useState } from "react";
import Screen from "./components/Screen";
import { TScreen, TTask } from "./types";
import { createTask } from "./functions/tasks";
import { openScreen } from "./functions/screens";
import { useTasks, useUpdate } from "./functions/main";

export const App = () => {
  const [update, setUpdate] = useState(0);
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [screens, setScreens] = useState<TScreen[]>([]);

  useTasks(tasks, update, setTasks, setScreens, createTask, openScreen);
  useUpdate(setUpdate);

  return (
    <>
      {screens.map((screen, key) => (
        <Screen key={key} props={screen.props} />
      ))}
    </>
  );
};

export default App;
