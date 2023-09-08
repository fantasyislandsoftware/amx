import React from "react";
import { FC } from "react";
import TitleBar from "./TitleBar";
import { TContext } from "../../interfaces/canvas";
import { TCalcWindowElement } from "../../functions/calcElements/calcWindowElements";

interface Props {
  ctx: TContext;
  palette: string[];
  windowProps: TCalcWindowElement;
}

const Window: FC<Props> = ({ ctx, palette, windowProps }) => {
  const render = () => {
    /* border */
    ctx.fillStyle = palette[1];
    ctx.fillRect(
      windowProps.container.x,
      windowProps.container.y,
      windowProps.container.width,
      windowProps.container.height
    );

    /* client */
    ctx.fillStyle = palette[3];
    ctx.fillRect(
      windowProps.client.x,
      windowProps.client.y,
      windowProps.client.width,
      windowProps.client.height
    );
  };

  ctx && render();

  return (
    <>
      <TitleBar ctx={ctx} palette={palette} windowProps={windowProps} />
    </>
  );
};

export default Window;
