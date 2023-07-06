import { title } from "process";
import { TScreen } from "../../interfaces/screen";
import { useIntuitionStore } from "../../stores/useIntuitionStore";

export type TCalcButtonElement = {
  x: number;
  y: number;
  width: number;
  height: number;
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
        button: {
          close: TCalcButtonElement;
        };
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
    const titleBar = window.titleBar
      ? {
          x: window.x + 1,
          y: window.y + 1,
          width: window.width - 2,
          height:
            settings.window.titleBar.font.size +
            settings.window.titleBar.padding.top +
            settings.window.titleBar.padding.bottom,
          text: window.titleBar.text,
          fontSize: settings.window.titleBar.font.size,
          padding: settings.window.titleBar.padding,
          button: {
            close: {
              x: window.x,
              y: window.y,
              width: 16,
              height: 16,
            },
          },
        }
      : undefined;

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
  });

  return result;
};
