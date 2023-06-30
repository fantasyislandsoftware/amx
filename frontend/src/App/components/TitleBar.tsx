import React, { FC } from "react";
import { TScreen } from "../interfaces/screen";

interface Props {
  ctx: any;
  screen: TScreen;
}

const TitleBar: FC<Props> = ({ ctx, screen }) => {
  const render = () => {
    if (screen.titleBar) {
      ctx.fillStyle = screen.palette[1];
      ctx.fillRect(
        0,
        0,
        ctx.canvas.width,
        screen.titleBar.fontSize + screen.titleBar.padding * 2
      );

      ctx.fillStyle = screen.palette[0];
      ctx.font = `${screen.titleBar.fontSize}px amiga`;
      ctx.fillText(
        screen.titleBar.text,
        screen.titleBar.padding * 2,
        screen.titleBar.fontSize + screen.titleBar.padding
      );
    }
    //requestAnimationFrame(render);
  };

  ctx && render();

  return <></>;
};

export default TitleBar;
