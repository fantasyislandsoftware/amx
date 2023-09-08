import { IScreen } from "../components/Screen/screenInterface";
import { useScreenStore } from "../components/Screen/useScreenStore";
import { createCanvasContext } from "./canvasHandler";

export const screenIdToIndex = (id: number): number | undefined => {
  const { screens } = useScreenStore.getState();
  let result = undefined;
  screens.map((screen, index) => {
    if (screen.id === id) result = index;
  });
  return result;
};

export const createScreen = (screen: IScreen) => {
  const { screens, setScreens, nextAvailableScreenId, incAvailableScreenId } =
    useScreenStore.getState();
  incAvailableScreenId();
  let newScreen = screen;
  newScreen.id = nextAvailableScreenId;
  screens.push(newScreen);
  setScreens(screens);
};
