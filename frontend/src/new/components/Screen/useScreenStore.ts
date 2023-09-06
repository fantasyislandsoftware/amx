import { create } from "zustand";
import { IScreen } from "./screenInterface";

type DragScreen =
  | {
      id: number | undefined;
      offset: { y: number } | undefined;
    }
  | undefined;

export interface ScreenStore {
  screens: IScreen[];
  setScreens: (screens: IScreen[]) => void;
  nextAvailableScreenId: number;
  incAvailableScreenId: () => void;
  dragScreen: DragScreen;
  setDragScreen: (dragScreen: DragScreen) => void;
}

const amxScreen: IScreen = {
  id: 0,
  mode: {
    width: 320,
    height: 240,
    bitDepth: 8,
  },
  top: 0,
};

export const useScreenStore = create<ScreenStore>((set) => ({
  screens: [amxScreen],
  setScreens: (screens) => set({ screens }),
  nextAvailableScreenId: 1,
  incAvailableScreenId: () =>
    set((state) => ({
      nextAvailableScreenId: state.nextAvailableScreenId + 1,
    })),
  dragScreen: undefined,
  setDragScreen: (dragScreen) => set({ dragScreen }),
}));
