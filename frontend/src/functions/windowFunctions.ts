import { useWindowStore } from "../stores/windowStore";
import { EnumWindowState, TWindow } from "../types";

export const openWindow = (
  name : string, title : string,
  parentId: number | null,
) => {
  if (parentId === null) {
    parentId = 0; /* Workbench screen index */
  }
  const latestWindowId = useWindowStore.getState().latestWindowId;
  const newWindow: TWindow = {
    props: {
      info: {
        id: latestWindowId,
        parentId: parentId,
        name: name,
        title: title,
        x: Math.random() * 500,
        y: Math.random() * 500,
        state: EnumWindowState.OPEN,
        content: 0,
      },
    },
  };
  
  const windows = useWindowStore.getState().windows;
  windows.push(newWindow);
  useWindowStore.setState({ windows: windows });
  useWindowStore.setState({ latestWindowId: latestWindowId + 1 });
};
