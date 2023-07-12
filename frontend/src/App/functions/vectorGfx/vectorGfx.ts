import { TContext } from "../../interfaces/canvas";
import { TVectorGraphic } from "../../interfaces/vectorGfx";

export const drawVectorGfx = (
    ctx: TContext,
    x: number,
    y: number,
    w: number,
    h: number,
    data: TVectorGraphic[]
  ) => {
    const area = { x: x, y: y, w: w, h: h };
    data.map((el) => {
      ctx.fillStyle = el.color;
      const x = Math.round((el.x1 * area.w) / 100);
      const y = Math.round((el.y1 * area.h) / 100);
      const w = Math.round((el.x2 * area.w) / 100);
      const h = Math.round((el.y2 * area.h) / 100);
      if (el.type === "rect") {
        ctx.fillRect(x + area.x, y + area.y, w - x, h - y);
      }
    });
  };