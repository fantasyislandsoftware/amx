import { TWindow } from "../../interfaces/window";
import { CloseButton, OrderButton } from "../../presets/buttons";
import { useIntuitionStore } from "../../stores/useIntuitionStore";

export const getNextAvailWindowId = (screenId: number) => {
    let result = 0;
    const { screens } = useIntuitionStore.getState();
    const screenIndex = screens.findIndex((screen) => screen.id === screenId);
    const windows = screens[screenIndex].windows;
    if (windows.length !== 0) {
        const t = windows[windows.length - 1];
        result = t.id + 1;
    }
  return result;
};

export const openWindow = (
  screenId: number,
  x: number,
  y: number,
  width: number,
  height: number,
  title: string,
  buttons: { order: boolean; close: boolean }
) => {
  const nextId = getNextAvailWindowId(screenId);
  const { screens, setScreens } = useIntuitionStore.getState();
  const closeButton = new CloseButton();
  const orderButton = new OrderButton();
  const window: TWindow = {
    id: nextId,
    x: x,
    y: y,
    width: width,
    height: height,
    titleBar: {
      text: title,
      buttons: [
        buttons.close && closeButton.get(),
        buttons.order && orderButton.get(),
      ],
    },
    zOrder: 2,
  };
  const screenIndex = screens.findIndex((screen) => screen.id === screenId);
  screens[screenIndex].windows.push(window);
  setScreens(screens);
};
