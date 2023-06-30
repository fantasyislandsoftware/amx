import { TWindow } from "../interfaces/window";

const orderWindowsByZIndex = (windows: TWindow[]) => {
  return windows.sort((a, b) => {
    if (a.zOrder < b.zOrder) {
      return -1;
    }
  });
};

export const findWindow = (
  windows: TWindow[],
  x: number,
  y: number
): number | null => {
  const _windows = orderWindowsByZIndex(windows);
  let result = null;
  _windows.map((window) => {
    if (
      x > window.x &&
      x < window.x + window.width &&
      y > window.y &&
      y < window.y + window.height
    ) {
      result = window.id;
    }
  });
  return result;
};

export const windowIdToIndex = (windows: TWindow[], id: number): number | null => {
  let index = null;
  windows.map((window, i) => {
    if (window.id === id) {
      index = i;
    }
  });
  return index;
};
