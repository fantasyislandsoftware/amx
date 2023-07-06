import React, { FC } from "react";
import { TWindow } from "../../interfaces/window";
import { useIntuitionStore } from "../../stores/useIntuitionStore";
import { TScreen } from "../../interfaces/screen";
import Close from "../Close";
import Button from "../Button";
import { TContext } from "../../interfaces/canvas";
import { TCalcWindowElement } from "../../functions/calcElements/calcWindowElements";
import { closeIcon } from "../../functions/drawElements/closeIcon";

interface Props {
  ctx: TContext;
  palette: string[];
  windowProps: TCalcWindowElement;
}

const TitleBar: FC<Props> = ({ ctx, palette, windowProps }) => {
  const { settings, selectedWindow } = useIntuitionStore((state) => state);
  const render = () => {
    /* Bar */
    ctx.fillStyle = palette[selectedWindow === windowProps.general.id ? 2 : 3];
    ctx.fillRect(
      windowProps.titleBar.x,
      windowProps.titleBar.y,
      windowProps.titleBar.width,
      windowProps.titleBar.height
    );

    /* Border line */
    ctx.fillStyle = palette[1];
    ctx.fillRect(
      windowProps.titleBar.x,
      windowProps.titleBar.y + windowProps.titleBar.height,
      windowProps.titleBar.width,
      1
    );

    /* Text */
    ctx.fillStyle = palette[0];
    ctx.font = `${settings.window.titleBar.font.size}px ${settings.window.titleBar.font.name}`;
    ctx.fillText(
      windowProps.titleBar.text,
      windowProps.titleBar.x + settings.window.titleBar.padding.left,
      windowProps.titleBar.y + windowProps.titleBar.height
    );
  };

  ctx && render();

  return (
    <>
      /* Close button */
      <Button
        ctx={ctx}
        palette={palette}
        buttonProps={windowProps.titleBar.button.close}
        icon={closeIcon}
      />
    </>
  );
};

export default TitleBar;
