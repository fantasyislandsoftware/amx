import { type IScreen } from "../components/Screen/screenInterface";
import { useScreenStore } from "../components/Screen/useScreenStore";

export const screenIdToIndex = (id: number): number | undefined => {
  const { screens } = useScreenStore.getState();
  let result;
  screens.map((screen, index) => {
    if (screen.id === id) result = index;
  });
  return result;
};

export const createScreen = (screen: IScreen) => {
  const { screens, setScreens, nextAvailableScreenId, incAvailableScreenId } =
    useScreenStore.getState();
  incAvailableScreenId();
  const newScreen = screen;
  newScreen.id = nextAvailableScreenId;
  newScreen.zIndex = getHighestScreenZIndex() + 1;

  if (newScreen.titleBar) {
    newScreen.titleBar["icons"] = {
      order: {
        zone: {
          x: 0,
          y: 0,
          w: 0,
          h: 0,
        },
        state: 0,
      },
    };
  }

  screens.push(newScreen);
  setScreens(screens);
};

export const getHighestScreenZIndex = () => {
  const { screens } = useScreenStore.getState();
  let result = 0;
  screens.map((screen) => {
    if (!screen.zIndex) screen.zIndex = 0;
    if (screen.zIndex > result) result = screen.zIndex;
  });
  return result;
};
