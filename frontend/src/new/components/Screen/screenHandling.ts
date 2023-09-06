import { IScreen, IScreenMode, ITitleBar } from "./screenInterface";
import { useScreenStore } from "./useScreenStore";

export const createScreen = (mode: IScreenMode, titleBar: ITitleBar, top : number) => {
  const { screens, setScreens, nextAvailableScreenId, incAvailableScreenId } =
    useScreenStore.getState();
  incAvailableScreenId();

  const newScreen: IScreen = {
    id: nextAvailableScreenId,
    mode: mode,
    titleBar: titleBar,
    top: top,
  };
  screens.push(newScreen);
  setScreens(screens);
};
