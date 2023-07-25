import React, { useEffect, useState } from "react";
import "./css/base.css";
import { compileApps } from "../api/functions/post/compileApps";
import { loadFonts } from "./functions/fonts";
import { useIntuitionStore } from "./stores/useIntuitionStore";
import { runTasks, startTask } from "./functions/tasks";
import { useTaskStore } from "./stores/useTaskStore";
import Screens from "./components/screens/Screens";
import { _12BitColour } from "./functions/colour";
import { processMessage } from "./functions/message";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const { screens, setScreens } = useIntuitionStore((state) => state);
  const [runMode] = useState<"normal" | "debug">("debug");
  const test = async () => {
    const x = await compileApps();
  };

  loadFonts().then(() => {
    setLoaded(true);
  });

  useEffect(() => {

  const timer = setTimeout(async () => {
      startTask("/src/amxjs/boot.js");
      return () => clearInterval(timer);
    }, 1);

    if (runMode === "debug") {
      const interval = setInterval(() => {
        runTasks(screens, setScreens);
      }, 100);
      return () => clearInterval(interval);
    } else {
      const render = () => {
        runTasks(screens, setScreens);
        requestAnimationFrame(render);
      };
      render();
    }
  }, []);

  if (!loaded) {
    return null;
  } else {
    return <Screens processMessage={processMessage} />;
  }
};

export default App;

