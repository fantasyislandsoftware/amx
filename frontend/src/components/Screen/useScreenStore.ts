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

export const useScreenStore = create<ScreenStore>((set) => ({
  screens: [],
  setScreens: (screens) => set({ screens }),
  nextAvailableScreenId: 0,
  incAvailableScreenId: () =>
    set((state) => ({
      nextAvailableScreenId: state.nextAvailableScreenId + 1,
    })),
  dragScreen: undefined,
  setDragScreen: (dragScreen) => set({ dragScreen }),
}));
