import { create, StoreApi, UseBoundStore } from "zustand";
import { TWindow } from "../types";

export type UseWindowStore = {
  latestWindowId: number;
  windows: TWindow[];
};

export const useWindowStore: UseBoundStore<StoreApi<UseWindowStore>> = create(() => ({
  latestWindowId: 0,
  windows: [],
}));
