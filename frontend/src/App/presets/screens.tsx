import { _12BitColour } from "../functions/colour";
import {
  EnumColorMax,
  EnumScreenType,
  ScreenModeHiRes,
  ScreenModeLowRes,
  TScreen,
} from "../interfaces/screen";

export const amx = (id: number): TScreen => {
  return {
    id: id,
    type: EnumScreenType.INTUITION,
    mode: ScreenModeLowRes,
    numberOfColours: EnumColorMax.COLOUR_8,
    palette: ["black", "white"],
    titleBar: undefined,
    order: 1,
    y: 0,
    windows: [],
  };
};

export const workbench = (id: number): TScreen => {
  return {
    id: id,
    type: EnumScreenType.INTUITION,
    mode: ScreenModeLowRes,
    numberOfColours: EnumColorMax.COLOUR_8,
    palette: [
      _12BitColour(15, 15, 15),
      _12BitColour(0, 0, 0),
      _12BitColour(0, 0, 15),
      _12BitColour(10, 10, 10),
    ],
    titleBar: { text: "Workbench", fontSize: 16, padding: 1 },
    order: 1,
    y: 0,
    windows: [
      {
        id: 0,
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        titleBar: { text: "Window 1", fontSize: 16, padding: 1 },
        zOrder: 0,
      },
      {
        id: 1,
        x: 80,
        y: 80,
        width: 100,
        height: 100,
        titleBar: { text: "Window 2", fontSize: 16, padding: 1 },
        zOrder: 1,
      },
    ],
  };
};

export const workbench2: TScreen = {
  id: 1,
  type: EnumScreenType.INTUITION,
  mode: ScreenModeHiRes,
  numberOfColours: EnumColorMax.COLOUR_8,
  palette: ["black", "white"],
  titleBar: { text: "Workbench2", fontSize: 16, padding: 1 },
  order: 0,
  y: 0,
  windows: [],
};
