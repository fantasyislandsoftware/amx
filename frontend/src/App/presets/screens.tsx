import { _12BitColour } from "../functions/colour";
import { EnumButtonState } from "../interfaces/button";
import {
  EnumColorMax,
  EnumScreenType,
  ScreenModeHiRes,
  ScreenModeLowRes,
  ScreenModeSuperHiRes,
  TScreen,
} from "../interfaces/screen";
import { CloseButton, OrderButton } from "./buttons";

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

const closeButton = new CloseButton();
const orderButton = new OrderButton();

export const workbench = (id: number): TScreen => {
  return {
    id: id,
    type: EnumScreenType.INTUITION,
    mode: ScreenModeLowRes,
    numberOfColours: EnumColorMax.COLOUR_8,
    palette: [
      _12BitColour(15, 15, 15),
      _12BitColour(0, 0, 0),
      _12BitColour(0, 6, 15),
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
        width: 120,
        height: 100,
        titleBar: {
          text: "Window 1",
          buttons: [closeButton.get(), orderButton.get()],
        },
        zOrder: 0,
      },
      /*null,
      {
        id: 1,
        x: 80,
        y: 80,
        width: 200,
        height: 100,
        titleBar: {
          text: "Window 2",
          buttons: [closeButton.get(), orderButton.get()],
        },
        zOrder: 1,
      },
      {
        id: 2,
        x: 10,
        y: 20,
        width: 120,
        height: 100,
        titleBar: {
          text: "Window 3",
          buttons: [closeButton.get(), orderButton.get()],
        },
        zOrder: 2,
      },*/
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

export const openScreen = () => {
  console.log("openScreen");
};