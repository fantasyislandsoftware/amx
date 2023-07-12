import { useIntuitionStore } from "../stores/useIntuitionStore";

export const screenIdToIndex = (screenId: number): number | null => {
  const { screens } = useIntuitionStore.getState();
  let result = null;
  screens.map((screen, index) => {
    if (screen.id === screenId) result = index;
  });

  return result;
};
