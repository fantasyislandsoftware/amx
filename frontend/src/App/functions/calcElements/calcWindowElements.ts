import { title } from "process";
import { TScreen } from "../../interfaces/screen";
import { useIntuitionStore } from "../../stores/useIntuitionStore";
import { EnumButtonState } from "../../interfaces/button";
import { TIcon } from "../../interfaces/icons";
import { EnumMessageAction } from "../../interfaces/message";

export type TCalcButtonElement = {
  x: number;
  y: number;
  width: number;
  height: number;
  state: EnumButtonState;
  icon: TIcon;
  action : EnumMessageAction;
};

export type TCalcWindowElement = {
  general: {
    id: number;
  };
  container: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  titleBar:
    | {
        x: number;
        y: number;
        width: number;
        height: number;
        text: string;
        padding: {
          left: number;
          right: number;
          top: number;
          bottom: number;
        };
        buttons: TCalcButtonElement[];
      }
    | undefined;
  client: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export const calcWindowElements = (screen: TScreen): TCalcWindowElement[] => {
  const { settings } = useIntuitionStore();
  let result: TCalcWindowElement[] = [];
  screen.windows.map((window) => {
    if (window !== null) {
      const general = {
        id: window.id,
      };

      /* Container */
      const container = {
        x: window.x,
        y: window.y,
        width: window.width,
        height: window.height,
      };

      /* Titlebar */
      let titleBarHeight =
        settings.window.titleBar.font.size +
        settings.window.titleBar.padding.top +
        settings.window.titleBar.padding.bottom;

      if (titleBarHeight % 2 !== 0) {
        titleBarHeight += 1;
      }

      const titleBar = window.titleBar
        ? {
            x: window.x + 1,
            y: window.y + 1,
            width: window.width - 2,
            height: titleBarHeight,
            text: window.titleBar.text,
            fontSize: settings.window.titleBar.font.size,
            padding: settings.window.titleBar.padding,
            buttons: window.titleBar.buttons.map((button, index) => {
              return {
                x:
                  window.x +
                  window.width -
                  titleBarHeight -
                  index * titleBarHeight,
                y: window.y + 2,
                width: titleBarHeight - 2,
                height: titleBarHeight - 2,
                state: button.state,
                icon: button.icon,
                action: button.action,
              };
            }),
          }
        : null;

      /* Client */
      const client = {
        x: window.x + 1,
        y: window.y + 1 + (titleBar ? titleBar.height : 0),
        width: window.width - 2,
        height: window.height - (2 + (titleBar ? titleBar.height : 0)),
      };

      /* Combine */
      result.push({
        general: general,
        container: container,
        titleBar: titleBar,
        client: client,
      });
    } else {
      result.push(undefined);
    }
  });

  return result;
};
