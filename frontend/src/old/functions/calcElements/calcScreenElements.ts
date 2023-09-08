import { TScreen } from "../../interfaces/screen";
import { useIntuitionStore } from "../../stores/useIntuitionStore";

export type TCalcScreenElements = {
  titleBar:
    | {
        text: string;
        height: number;
        padding: {
          left: number;
          right: number;
          top: number;
          bottom: number;
        };
      }
    | undefined;
};

export const calcScreenElements = (screen: TScreen): TCalcScreenElements => {
  const { settings } = useIntuitionStore();
  const titleBar = screen.titleBar
    ? {
        text: screen.titleBar.text,
        fontSize: screen.titleBar.fontSize,
        height:
          screen.titleBar.fontSize +
          settings.screen.titleBar.padding.top +
          settings.screen.titleBar.padding.bottom,
        padding: {
          left: settings.screen.titleBar.padding.left,
          right: settings.screen.titleBar.padding.right,
          top: settings.screen.titleBar.padding.top,
          bottom: settings.screen.titleBar.padding.bottom,
        },
      }
    : undefined;
  return {
    titleBar: titleBar,
  };
};
