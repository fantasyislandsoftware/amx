import { create, StoreApi, UseBoundStore } from "zustand";
import { TScreen } from "../types";

export type UseScreenStore = {
  latestScreenId: number;
  screens: TScreen[];
};

export const useScreenStore: UseBoundStore<StoreApi<UseScreenStore>> = create(() => ({
  latestScreenId: 0,
  screens: [],
}));
