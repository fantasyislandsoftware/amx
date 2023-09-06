import React, { FC } from "react";
import { TCalcScreenElements } from "../../functions/calcElements/calcScreenElements";
import { TContext } from "../../interfaces/canvas";
import { useIntuitionStore } from "../../stores/useIntuitionStore";

interface Props {
  ctx: TContext;
  screenProps: TCalcScreenElements;
  palette: string[];
}

const TitleBar: FC<Props> = ({ ctx, screenProps, palette }) => {
  const { settings } = useIntuitionStore((state) => state);
  const render = () => {
    if (screenProps.titleBar) {
      ctx.fillStyle = palette[1];
      ctx.fillRect(0, 0, ctx.canvas.width, screenProps.titleBar.height);

      ctx.fillStyle = palette[0];
      ctx.font = `${settings.screen.titleBar.font.size}px ${settings.screen.titleBar.font.name}`;
      ctx.fillText(
        screenProps.titleBar.text,
        screenProps.titleBar.padding.left,
        screenProps.titleBar.height
      );
    }
  };

  ctx && render();

  return null;
};

export default TitleBar;
