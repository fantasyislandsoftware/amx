import React, { useEffect, useState } from "react";
import { useScreenStore } from "./components/Screen/useScreenStore";
import ScreenContainer from "./components/Screen/components/ScreenContainer";
import "../css/base.css";
import {
  EnumOSEventObjectType,
  EnumOSEventType,
  IOSEvent,
} from "./interfaces/OSEvents";
import { lowres } from "./components/Screen/presets/screenModes";
import { createScreen } from "./components/Screen/screenHandling";
import { assigned } from "./handlers/generalHandlers";
import { screenIdToIndex } from "./handlers/screenHandlers";

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
      createScreen(
        lowres,
        {
          font: { size: 10, name: "arial" },
          text: "ABCDEFGabcdefg",
        },
        100
      );
      createScreen(
        lowres,
        {
          font: { size: 10, name: "arial" },
          text: "test",
        },
        200
      );
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
    </>
  );
};

export default App;
