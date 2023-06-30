import { create } from "zustand";
import { TScreen } from "../interfaces/screen";
import { amx } from "../presets/screens";

export interface IntuitionStore {
  screens: TScreen[];
  setScreens: (screens: TScreen[]) => void;
  selectedScreen: number;
  setSelectedScreen: (selectedScreen: number) => void;
  nextAvailScreenId: number;
  setNextAvailScreenId: (nextAvailScreenId: number) => void;
  selectedWindow: number;
  setSelectedWindow: (selectedWindow: number) => void;
}

export const useIntuitionStore = create<IntuitionStore>((set) => ({
  screens: [amx(0)],
  setScreens: (screens) => set({ screens }),
  selectedScreen: 0,
  setSelectedScreen: (selectedScreen) => set({ selectedScreen }),
  nextAvailScreenId: 1,
  setNextAvailScreenId: (nextAvailScreenId) => set({ nextAvailScreenId }),
  selectedWindow: null,
  setSelectedWindow: (selectedWindow) => set({ selectedWindow }),
}));
