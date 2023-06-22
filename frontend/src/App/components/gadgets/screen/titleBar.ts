import { dragElement } from "../../../functions/drag";
import { TScreen } from "../../../interfaces/screen";

export const titleBar = (
  ctx: any,
  screen: TScreen,
  sendMessage: any,
  baseId: string,
  mouseY: number
) => {
  const padding = 1;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, screen.titleBar.fontSize + padding * 2);

  ctx.fillStyle = "white";
  ctx.font = `${screen.titleBar.fontSize}px amiga`;
  ctx.fillText(
    screen.titleBar.text,
    padding,
    screen.titleBar.fontSize + padding
  );

  dragElement(
    document.getElementById(baseId),
    mouseY < screen.titleBar.fontSize + padding,
    (top) => {
      sendMessage({ screenId: screen.id, key: "y", value: top });
    }
  );
};
