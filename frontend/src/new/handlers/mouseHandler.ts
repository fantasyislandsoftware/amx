import { IScreen } from "../components/Screen/screenInterface";
import { IMouse } from "../interfaces/OSEvents";

export const getMouse = (e: any, screen: IScreen): IMouse => {
  const clientX = e.clientX;
  const clientY = e.clientY;
  return {
    client: {
      x: clientX,
      y: clientY,
    },
    screen: {
      x: Math.round(clientX / (e.target.clientWidth / screen.mode.width)) - 1,
      y:
        Math.round(
          (clientY - screen.top) / (e.target.clientHeight / screen.mode.height)
        ) - 1,
    },
    button: e.button,
  };
};
