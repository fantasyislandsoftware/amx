import React, { FC } from "react";
import { TWindow } from "../interfaces/window";
import { TScreen } from "../interfaces/screen";
import { TContext } from "../interfaces/canvas";
import { TCalcWindowElement } from "../functions/calcElements/calcWindowElements";

interface Props {
  ctx: TContext;
  palette: string[];
  windowProps: TCalcWindowElement;
}

type TVectorGraphic = {
  type: string;
  color: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

const test = (
  ctx: TContext,
  x: number,
  y: number,
  w: number,
  h: number,
  data: TVectorGraphic[]
) => {
  const area = { x: x, y: y, w: w, h: h };
  ctx.fillStyle = "grey";
  data.map((el) => {
    ctx.fillStyle = el.color;
    const x = Math.floor((el.x1 * area.w) / 100);
    const y = Math.floor((el.y1 * area.h) / 100);
    const w = Math.floor((el.x2 * area.w) / 100);
    const h = Math.floor((el.y2 * area.h) / 100);
    if (el.type === "rect") {
      ctx.fillRect(x + area.x, y + area.y, w - x, h - y);
    }
    //console.log(el);
  });
};

const Close: FC<Props> = ({ ctx, palette, windowProps }) => {
  const render = () => {
    const data: TVectorGraphic[] = [
      {
        type: "rect",
        color: palette[3],
        x1: 0,
        y1: 0,
        x2: 100,
        y2: 100,
      },
      {
        type: "rect",
        color: palette[1],
        x1: 40,
        y1: 40,
        x2: 60,
        y2: 60,
      },
      /*{
        type: "rect",
        color: palette[0],
        x1: 40,
        y1: 40,
        x2: 70,
        y2: 65,
      },*/
    ];

    //test(ctx, windowProps.titleBar.x, windowProps.titleBar.y, 20, 20, data);
    test(ctx, 20, 20, 20, 20, data);
  };

  ctx && render();

  return <></>;
};

export default Close;
