import React, { useState } from "react";
import Screens from "./components/Screens";
import "./css/base.css";
import { compileApps } from "../api/functions/post/compileApps";
import {
  EnumColorMax,
  EnumScreenType,
  ScreenModeLowRes,
  TScreen,
} from "./interfaces/screen";
import { workbench, workbench2 } from "./presets/screens";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [screens, setScreens] = useState<TScreen[]>([workbench, workbench2]);

  const test = async () => {
    const x = await compileApps();
    console.log(x);
  };

  //const x = test();

  function listFonts() {
    let { fonts } = document;
    //@ts-ignore
    const it = fonts.entries();

    let arr = [];
    let done = false;

    while (!done) {
      const font = it.next();
      if (!font.done) {
        arr.push(font.value[0]);
      } else {
        done = font.done;
      }
    }
  }

  const loadFont = async () => {
    var amigaFont = new FontFace(
      "amiga",
      "url(../fonts/AmigaTopazUnicodeRus.ttf)"
    );
    const font = await amigaFont.load();

    if (font.status === "loaded") {
      //@ts-ignore
      document.fonts.add(font);
      setLoaded(true);
    }
    //
  };

  loadFont();

  if (!loaded) {
    return null;
  } else {
    listFonts();

    const sendMessage = (message: any) => {
      console.log(message);
      screens[message.screenId].y = message.value;
      setScreens([...screens]);
    };

    return (
      <>
        <div>AMX</div>
        <Screens screens={screens} sendMessage={sendMessage} />
      </>
    );
  }
};

export default App;
