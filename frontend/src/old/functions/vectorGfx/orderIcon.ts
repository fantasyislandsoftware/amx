import { TContext } from "../../interfaces/canvas";
import { TVectorGraphic } from "../../interfaces/vectorGfx";
import { TCalcButtonElement } from "../calcElements/calcWindowElements";
import { drawVectorGfx } from "./vectorGfx";

export const orderIcon = (
  ctx: TContext,
  palette: string[],
  buttonProps: TCalcButtonElement
) => {
  const data: TVectorGraphic[] = [
    {
      type: "rect",
      color: palette[1],
      x1: 10,
      y1: 10,
      x2: 70,
      y2: 70,
    },
    {
      type: "rect",
      color: palette[0],
      x1: 20,
      y1: 20,
      x2: 60,
      y2: 60,
    },
    {
      type: "rect",
      color: palette[1],
      x1: 30,
      y1: 30,
      x2: 90,
      y2: 90,
    },
    {
      type: "rect",
      color: palette[0],
      x1: 40,
      y1: 40,
      x2: 80,
      y2: 80,
    },
    
  ];

  const { x, y, width, height } = buttonProps;
  drawVectorGfx(ctx, x + 1, y + 1, width - 2, height - 2, data);
};
