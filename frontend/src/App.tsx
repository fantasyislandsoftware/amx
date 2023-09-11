import React, { useEffect, useState } from "react";
import { useScreenStore } from "./components/Screen/useScreenStore";
import ScreenContainer from "./components/Screen/components/ScreenContainer";
import "./css/base.css";
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IOSEvent,
} from "./interfaces/OSEvents";
import { lowres } from "./presets/screenModes";
import { assigned } from "./handlers/generalHandlers";
import {
  createScreen,
  getHighestScreenZIndex,
  screenIdToIndex,
} from "./handlers/screenHandlers";
import { default16ColourPalette } from "./presets/palettes";

const App = () => {
  const [init, setInit] = useState(false);
  const { screens, setScreens, dragScreen, setDragScreen } = useScreenStore(
    (state) => state
  );

  //var myFont = new FontFace('myFont', 'url(fonts/myFont/AmigaTopazUnicideRus.ttf)');
  //console.log(myFont);

  const processOSEvent = (osEvent: IOSEvent) => {
    if (osEvent.parent) {
      switch (osEvent.parent.object) {
        /* Screen */
        case EnumOSEventObjectType.Screen:
          switch (osEvent.object) {
            /* Client */
            case EnumOSEventObjectType.Client:
              break;
            /* Titlebar */
            case EnumOSEventObjectType.Titlebar:
              switch (osEvent.type) {
                /* Mouse Down */
                case EnumOSEventType.MouseDown:
                  const screenIndex = screenIdToIndex(osEvent.parent.id);
                  /* Set screen to highest z-index */
                  const newIndex = getHighestScreenZIndex() + 1;
                  screens[screenIndex].zIndex = newIndex;
                  setScreens([...screens]);
                  /* Set drag screen */
                  setDragScreen({
                    id: osEvent.parent.id,
                    offset: {
                      y: osEvent.mouse.client.y - screens[screenIndex].top,
                    },
                  });
                  break;
                /* Mouse Up */
                case EnumOSEventType.MouseUp:
                  setDragScreen(undefined);
                  break;
              }
              break;
          }
          break;
      }
    } else {
      switch (osEvent.object) {
        /* Screen */
        case EnumOSEventObjectType.Screen:
          switch (osEvent.type) {
            /* Mouse Move */
            case EnumOSEventType.MouseMove:
              if (assigned(dragScreen)) {
                const screenIndex = screenIdToIndex(dragScreen.id);
                screens[screenIndex].top =
                  osEvent.mouse.client.y - dragScreen.offset.y;
                if (screens[screenIndex].top < 0) screens[screenIndex].top = 0;
                setScreens([...screens]);
              }
              break;
            /* Mouse Leave */
            /*case EnumOSEventType.MouseLeave:
              setDragScreen(undefined);
              break;*/
          }
          break;
      }
    }
  };

  useEffect(() => {
    if (init) return;
    setTimeout(() => {
      createScreen({
        mode: lowres,
        top: 0,
        palette: default16ColourPalette,
      });
      createScreen({
        mode: lowres,
        top: 100,
        titleBar: {
          font: { size: 10, name: "arial" },
          text: "ABCDEFGabcdefg",
        },
        palette: default16ColourPalette,
      });
      createScreen({
        mode: lowres,
        top: 200,
        titleBar: {
          font: { size: 10, name: "arial" },
          text: "ABCDEFGabcdefg 2",
        },
        palette: default16ColourPalette,
      });

      setInit(true);
    });
  }, [init]);

  return (
    <>
      {screens.map((screen, index) => (
        <ScreenContainer
          key={index}
          screen={screen}
          processOSEvent={processOSEvent}
        />
      ))}
      <canvas
        id="clientCanvas"
        style={{
          display: "none",
          imageRendering: "pixelated",
          fontSmooth: "never",
          WebkitFontSmoothing: "none",
          backgroundColor: "grey",
        }}
      ></canvas>
      <canvas
        id="titleBarCanvas"
        style={{
          display: "none",
          imageRendering: "pixelated",
          fontSmooth: "never",
          WebkitFontSmoothing: "none",
          backgroundColor: "grey",
        }}
      ></canvas>
    </>
  );
};

export default App;
