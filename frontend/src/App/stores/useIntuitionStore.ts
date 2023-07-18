import { create } from "zustand";
import { TScreen } from "../interfaces/screen";
import { amx, workbench } from "../presets/screens";
import { TSettings } from "../interfaces/settings";
import { orderWindowsByZIndex } from "../functions/windows";
import { clearNulls } from "../functions/arrayHandler";

type SelectedWindow = {
  index: number | null;
  id: number | null;
};

export interface IntuitionStore {
  settings: TSettings;
  setSettings: (settings: TSettings) => void;
  screens: TScreen[];
  setScreens: (screens: TScreen[]) => void;
  selectedScreen: number;
  setSelectedScreen: (selectedScreen: number) => void;
  nextAvailScreenId: number;
  setNextAvailScreenId: (nextAvailScreenId: number) => void;
  selectedWindow: SelectedWindow | null;
  setSelectedWindow: (selectedWindow: SelectedWindow | null) => void;
  publicScreen: number;
  setPublicScreen: (publicScreen: number) => void;
}

export const useIntuitionStore = create<IntuitionStore>((set) => ({
  settings: {
    screen: {
      titleBar: {
        font: {
          name: "amiga",
          size: 16,
        },
        padding: {
          left: 2,
          right: 1,
          top: 1,
          bottom: 1,
        },
      },
    },
    window: {
      titleBar: {
        font: {
          name: "amiga",
          size: 16,
        },
        padding: {
          left: 2,
          right: 1,
          top: 1,
          bottom: 2,
        },
      },
    },
  },
  setSettings: (settings) => {
    set({ settings });
  },
  screens: [amx(0), workbench(1)],
  setScreens: (screens) => {
    screens.map((screen) => {
      screen.windows = clearNulls(screen.windows);
      screen.windows = orderWindowsByZIndex(screen.windows);
    });
    set({ screens });
  },
  selectedScreen: 0,
  setSelectedScreen: (selectedScreen) => set({ selectedScreen }),
  nextAvailScreenId: 1,
  setNextAvailScreenId: (nextAvailScreenId) => set({ nextAvailScreenId }),
  selectedWindow: null,
  setSelectedWindow: (selectedWindow) => set({ selectedWindow }),
  publicScreen: 1,
  setPublicScreen: (publicScreen) => set({ publicScreen }),
}));
