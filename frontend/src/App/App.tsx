import React, { useEffect, useState } from "react";
import "./css/base.css";
import { compileApps } from "../api/functions/post/compileApps";
import { loadFonts } from "./functions/fonts";
import { useIntuitionStore } from "./stores/useIntuitionStore";
import { main, startTask } from "./functions/tasks";
import { useTaskStore } from "./stores/useTaskStore";
import { loadFile } from "./functions/fileIO";
import Screens from "./components/screens/Screens";
import { _12BitColour } from "./functions/colour";
import { TMessage } from "./interfaces/message";
import { screenIdToIndex } from "./functions/screen";
import { windowIdToIndex } from "./functions/windows";
import { EnumButtonState } from "./interfaces/button";
import { set } from "lodash";
import { calcWindowElements } from "./functions/calcElements/calcWindowElements";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const { tasks } = useTaskStore((state) => state);
  const { screens, setScreens } = useIntuitionStore((state) => state);
  const [runMode] = useState<"normal" | "debug">("debug");
  const test = async () => {
    const x = await compileApps();
  };

  const sendMessage = (message: TMessage) => {

    const screenIndex = screenIdToIndex(message.parentId);
    const windowIndex = windowIdToIndex(
      screens[message.parentId].windows,
      message.id
    );
    screens[screenIndex].windows[windowIndex] = null;
    setScreens(screens);
  };

  loadFonts().then(() => {
    setLoaded(true);
  });

  useEffect(() => {
    const timer = setTimeout(async () => {
      const fileInfo = await loadFile("/data/js/workbench.js");
      startTask(fileInfo);
      return () => clearInterval(timer);
    }, 1);

    if (runMode === "debug") {
      const interval = setInterval(() => {
        main(tasks, screens, setScreens);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      const render = () => {
        main(tasks, screens, setScreens);
        requestAnimationFrame(render);
      };
      render();
    }
  }, []);

  if (!loaded) {
    return null;
  } else {
    return <Screens sendMessage={sendMessage} />;
  }
};

export default App;
