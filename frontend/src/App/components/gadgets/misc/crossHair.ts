import { TScreen } from "../../../interfaces/screen";

export const crossHair = (ctx: any, screen: TScreen, mouse: any) => {
  ctx.fillStyle = "blue";
  ctx.fillRect(mouse.x, 0, 1, screen.mode.height);
  ctx.fillRect(0, mouse.y, screen.mode.width, 1);
};
