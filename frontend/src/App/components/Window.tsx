import React from "react";
import { FC } from "react";
import { TWindow } from "../interfaces/window";
import { useIntuitionStore } from "../stores/useIntuitionStore";
import { TScreen } from "../interfaces/screen";

interface Props {
  ctx: any;
  screen : TScreen;
  window: TWindow;
}

const Window: FC<Props> = ({ ctx, screen, window }) => {
  const selectedWindow = useIntuitionStore((state) => state.selectedWindow);
  const render = () => {

    const x = window.x;
    const y = window.y;

    /* border */
    ctx.fillStyle = screen.palette[1];
    ctx.fillRect(x, y, window.width, window.height);

    /* content */
    ctx.fillStyle = screen.palette[3];
    ctx.fillRect(x + 1, y + 1, window.width - 2, window.height - 2);

    ctx.fillStyle = screen.palette[3];
    if (selectedWindow === window.id) {
      ctx.fillStyle = screen.palette[2];
    }
    ctx.fillRect(
      x + 1,
      y + 1,
      window.width - 2,
      window.titleBar.fontSize + window.titleBar.padding
    );

    ctx.fillStyle = screen.palette[0];
    ctx.font = `${window.titleBar.fontSize}px amiga`;
    ctx.fillText(
      window.titleBar.text,
      x + window.titleBar.padding * 2,
      y + window.titleBar.fontSize + window.titleBar.padding * 2
    );

    ctx.fillStyle = "black";
    ctx.fillRect(x, y + window.titleBar.fontSize + window.titleBar.padding, window.width, 1);

  };

  ctx && render();

  return <></>;
};

export default Window;
