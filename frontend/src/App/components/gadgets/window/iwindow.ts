import { TScreen } from "../../../interfaces/screen";
import { TWindow } from "../../../interfaces/window";

export const iwindow = (
  ctx: any,
  screen: TScreen,
  window: TWindow,
  selectedWindow: number
) => {
  const padding = 2;

  const x = window.x;
  const y = window.y;

  /* border */
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, window.width, window.height);

  /* content */
  ctx.fillStyle = "grey";  
  ctx.fillRect(x + 1, y + 1, window.width - 2, window.height - 2);

  ctx.fillStyle = "grey";
  if (selectedWindow === window.id) {
    ctx.fillStyle = "blue";
  }
  ctx.fillRect(x + 1, y + 1, window.width - 2, window.titleBar.fontSize + padding);

  ctx.fillStyle = "white";
  ctx.font = `${window.titleBar.fontSize}px amiga`;
  ctx.fillText(
    window.titleBar.text,
    x + padding,
    y + window.titleBar.fontSize + padding
  );

  ctx.fillStyle = "black";
  ctx.fillRect(x, y + window.titleBar.fontSize + padding, window.width, 1);
};
