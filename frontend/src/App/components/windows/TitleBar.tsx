import React, { FC } from "react";
import { useIntuitionStore } from "../../stores/useIntuitionStore";
import Button from "../buttons/Button";
import { TContext } from "../../interfaces/canvas";
import { TCalcWindowElement } from "../../functions/calcElements/calcWindowElements";
import { closeIcon } from "../../functions/vectorGfx/closeIcon";
import Buttons from "../buttons/Buttons";

interface Props {
  ctx: TContext;
  palette: string[];
  windowProps: TCalcWindowElement;
}

const TitleBar: FC<Props> = ({ ctx, palette, windowProps }) => {
  const { settings, selectedWindow } = useIntuitionStore((state) => state);
  let isSelected = false;
  if (selectedWindow !== null) {
    isSelected = selectedWindow.id === windowProps.general.id;
  }
  const render = () => {
    /* Bar */
    ctx.fillStyle = palette[isSelected ? 2 : 3];
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
      <Buttons
        ctx={ctx}
        isSelected={isSelected}
        palette={palette}        
        buttonProps={windowProps.titleBar.buttons}
      />
    </>
  );
};

export default TitleBar;
