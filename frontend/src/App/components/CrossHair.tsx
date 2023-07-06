import React from "react";
import { FC } from "react";
import { useMouseStore } from "../stores/useMouseStore";
import { TScreen } from "../interfaces/screen";
import { useIntuitionStore } from "../stores/useIntuitionStore";
import { TContext } from "../interfaces/canvas";

interface Props {
  ctx: TContext;
  screen: TScreen;
  enabled: boolean;
}

const CrossHair: FC<Props> = ({ ctx, screen, enabled }) => {
  const { mouse } = useMouseStore((state) => state);
  const { selectedScreen } = useIntuitionStore((state) => state);
  const render = () => {
    if (!enabled || selectedScreen !== screen.id) return;
    ctx.fillStyle = screen.palette[2];
    ctx.fillRect(mouse.px, 0, 1, screen.mode.height);
    ctx.fillRect(0, mouse.py, screen.mode.width, 1);
    //window.requestAnimationFrame(render);
  };

  ctx && render();

  return <></>;
};

export default CrossHair;
