import React, { useEffect, useState } from "react";
import Screens from "./components/Screens";
import "./css/base.css";
import { compileApps } from "../api/functions/post/compileApps";
import { TScreenMessage } from "./interfaces/screen";
import { loadFonts } from "./functions/fonts";
import { useMouseStore } from "./stores/useMouseStore";
import { EnumMouseButton } from "./interfaces/input";
import { useIntuitionStore } from "./stores/useIntuitionStore";
import { main, startTask } from "./functions/tasks";
import { useTaskStore } from "./stores/useTaskStore";
import { loadFile } from "./functions/fileIO";

const App = () => {
  const [loaded, setLoaded] = useState(false);

  const { tasks } = useTaskStore((state) => state);
  const { mouse } = useMouseStore((state) => state);
  const { screens, setScreens } = useIntuitionStore((state) => state);
  //const { selectedOffset } = useIntuitionStore((state) => state);
  const [runMode, setRunMode] = useState<"normal" | "debug">("debug");
  const test = async () => {
    const x = await compileApps();
  };

  const sendMessage = (message: TScreenMessage) => {
    //@ts-ignore
    //screens[message.screenId][message.key] = message.value;
    //screens[0].y = screens[0].y + message.value;
    //setScreens([...screens]);
  };

  loadFonts().then(() => {
    setLoaded(true);
  });

  useEffect(() => {
    const timer = setTimeout(async () => {
      const fileInfo = await loadFile("/data/js/workbench.js");
      startTask(fileInfo);
      return () => clearInterval(timer);
    }, 1000);

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
