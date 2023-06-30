import React from "react";
import { FC } from "react";
import { useMouseStore } from "../stores/useMouseStore";
import { TScreen } from "../interfaces/screen";

interface Props {
  ctx: any;
  screen: TScreen;
}

const ClearScreen: FC<Props> = ({ ctx, screen }) => {
  const render = () => {
    ctx.fillStyle = screen.palette[0];
    ctx.clearRect(0, 0, screen.mode.width, screen.mode.height);
  };

  ctx && render();

  return <></>;
};

export default ClearScreen;
