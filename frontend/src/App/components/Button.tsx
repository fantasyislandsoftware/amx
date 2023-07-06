import React, { FC } from "react";
import { TWindow } from "../interfaces/window";
import { TScreen } from "../interfaces/screen";
import { TContext } from "../interfaces/canvas";
import {
  TCalcButtonElement,
  TCalcWindowElement,
} from "../functions/calcElements/calcWindowElements";

interface Props {
  ctx: TContext;
  palette: string[];
  buttonProps: TCalcButtonElement;
  icon : () => void;
}

const Button: FC<Props> = ({ ctx, palette, buttonProps, icon }) => {
  const render = () => {
    const { x, y, width, height } = buttonProps;
    /* Background */
    ctx.fillStyle = palette[3];
    ctx.fillRect(
      buttonProps.x,
      buttonProps.y,
      buttonProps.width,
      buttonProps.height
    );
    /* Top line */
    ctx.fillStyle = palette[0];
    ctx.fillRect(x, y, width, 1);
    /* Left line */
    ctx.fillStyle = palette[0];
    ctx.fillRect(x, y, 1, height);
    /* Right line */
    ctx.fillStyle = palette[1];
    ctx.fillRect(x + width - 1, y + 1, 1, height - 1);
    /* Bottom line */
    ctx.fillStyle = palette[1];
    ctx.fillRect(x, y + height, width - 1, 1);
    /* Icon */
    icon();
  };

  ctx && render();

  return <></>;
};

export default Button;
