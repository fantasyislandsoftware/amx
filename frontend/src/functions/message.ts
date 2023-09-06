import { get } from "lodash";
import {
  EnumMessageAction,
  EnumMessageObj,
  TMessage,
} from "../interfaces/message";
import { useIntuitionStore } from "../stores/useIntuitionStore";
import {
  getHeighestWindowZIndex,
  getLowestWindowZIndex,
  screenIdToIndex,
} from "./screen";
import { windowIdToIndex } from "./windows";

export const processMessage = (message: TMessage) => {
  const { screens } = useIntuitionStore.getState();
  const screenIndex = screenIdToIndex(message.parentId);
  const windowIndex = windowIdToIndex(
    screens[message.parentId].windows,
    message.id
  );

  switch (message.obj) {
    case EnumMessageObj.SCREEN:
      processScreenMessage(message.action, screenIndex);
      break;
    case EnumMessageObj.WINDOW:
      processWindowMessage(message.action, screenIndex, windowIndex);
      break;
    default:
  }
};

const processScreenMessage = (
  action: EnumMessageAction,
  screenIndex: number
) => {};

const processWindowMessage = (
  action: EnumMessageAction,
  screenIndex: number,
  windowIndex: number
) => {
  const { screens, setScreens, setSelectedWindow } =
    useIntuitionStore.getState();
  switch (action) {
    case EnumMessageAction.CLOSE:
      screens[screenIndex].windows[windowIndex] = null;
      setScreens(screens);
      setSelectedWindow(null);
      break;
    case EnumMessageAction.ORDER:
      console.log("order");
      const current = screens[screenIndex].windows[windowIndex].zOrder;
      const low = getLowestWindowZIndex(screens[screenIndex].windows);
      const high = getHeighestWindowZIndex(screens[screenIndex].windows);

      if (current < high) {
        screens[screenIndex].windows[windowIndex].zOrder = high + 1;
      }
      if (current > low) {
        screens[screenIndex].windows[windowIndex].zOrder = low - 1;
      }
      setScreens(screens);

      break;
    default:
  }
};
