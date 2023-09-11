export interface TVectorGraphic {
  type: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  paletteIndex: number;
}

export interface TVectorZone {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const drawVectorGfx = (
  ctx: CanvasRenderingContext2D,
  zone: TVectorZone,
  data: TVectorGraphic[],
  palette: string[]
) => {
  data.map((el) => {
    ctx.fillStyle = palette[el.paletteIndex];
    const x = Math.round((el.x1 * zone.w) / 100);
    const y = Math.round((el.y1 * zone.h) / 100);
    const w = Math.round((el.x2 * zone.w) / 100);
    const h = Math.round((el.y2 * zone.h) / 100);
    if (el.type === "rect") {
      ctx.fillRect(x + zone.x, y + zone.y, w - x, h - y);
    }
  });
};
