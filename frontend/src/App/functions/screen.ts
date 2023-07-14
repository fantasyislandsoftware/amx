import { TWindow } from "../interfaces/window";
import { useIntuitionStore } from "../stores/useIntuitionStore";

export const screenIdToIndex = (screenId: number): number | null => {
  const { screens } = useIntuitionStore.getState();
  let result = null;
  screens.map((screen, index) => {
    if (screen.id === screenId) result = index;
  });

  return result;
};

export const getLowestWindowZIndex = (windows: TWindow[]) => {
  let result = 0;
  windows.map((window) => {
    if (window.zOrder < result) result = window.zOrder;
  });

  return result;
};

export const getHeighestWindowZIndex = (windows: TWindow[]) => {
  let result = 0;
  windows.map((window) => {
    if (window.zOrder > result) result = window.zOrder;
  });

  return result;
};
