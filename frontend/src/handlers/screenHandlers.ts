import { IScreen } from "../components/Screen/screenInterface";
import { useScreenStore } from "../components/Screen/useScreenStore";

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
  newScreen.zIndex = getHighestScreenZIndex() + 1;
  screens.push(newScreen);
  setScreens(screens);
};

export const getHighestScreenZIndex = () => {
  const { screens } = useScreenStore.getState();
  let result = 0;
  screens.map((screen) => {
    if (screen.zIndex > result) result = screen.zIndex;
  });
  return result;
};
