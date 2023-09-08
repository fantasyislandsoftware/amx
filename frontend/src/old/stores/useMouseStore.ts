import { create } from "zustand";
import { EnumMouseButton, TMouse } from "../interfaces/input";

export interface MouseStore {
  mouse: TMouse;
  setMouse: (mouse: TMouse) => void;
}

export const useMouseStore = create<MouseStore>((set) => ({
  mouse: { px: 0, py: 0, cx: 0, cy: 0, leftButton: EnumMouseButton.UP },
  setMouse: (mouse) => set({ mouse }),
}));
