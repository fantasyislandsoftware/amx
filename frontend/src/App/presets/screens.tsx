import {
  EnumColorMax,
  EnumScreenType,
  ScreenModeHiRes,
  ScreenModeLowRes,
  TScreen,
} from "../interfaces/screen";

export const workbench: TScreen = {
  id: 0,
  type: EnumScreenType.INTUITION,
  mode: ScreenModeLowRes,
  numberOfColours: EnumColorMax.COLOUR_8,
  palette: ["black", "white"],
  titleBar: { text: "Workbench", fontSize: 16 },
  order: 1,
  y: 100,
  windows: [
    {
      id: 0,
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      titleBar: { text: "Window 1", fontSize: 16 },
      zOrder: 0,
    },
    {
      id: 1,
      x: 80,
      y: 80,
      width: 100,
      height: 100,
      titleBar: { text: "Window 2", fontSize: 16 },
      zOrder: 1,
    },
  ],
};

export const workbench2: TScreen = {
  id: 1,
  type: EnumScreenType.INTUITION,
  mode: ScreenModeHiRes,
  numberOfColours: EnumColorMax.COLOUR_8,
  palette: ["black", "white"],
  titleBar: { text: "Workbench2", fontSize: 16 },
  order: 0,
  y: 0,
  windows: [],
};
