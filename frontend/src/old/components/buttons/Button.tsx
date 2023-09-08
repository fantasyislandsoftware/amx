import React, { FC } from "react";
import { TContext } from "../../interfaces/canvas";
import {
  TCalcButtonElement,
  TCalcWindowElement,
} from "../../functions/calcElements/calcWindowElements";
import { EnumButtonState } from "../../interfaces/button";
import { TIcon } from "../../interfaces/icons";

interface Props {
  ctx: TContext;
  palette: string[];
  hasBorder: boolean;
  isSelected: boolean;
  buttonProps: TCalcButtonElement;
  icon: TIcon;
}

const Button: FC<Props> = ({
  ctx,
  palette,
  hasBorder,
  isSelected,
  buttonProps,
  icon,
}) => {
  const render = () => {
    const { x, y, width, height, state } = buttonProps;

    /* Background */
    ctx.fillStyle = palette[isSelected ? 2 : 3];
    ctx.fillRect(x, y, width, height);

    if (hasBorder) {
      /* Top line */
      ctx.fillStyle = palette[state === EnumButtonState.DOWN ? 1 : 0];
      ctx.fillRect(x, y, width, 1);

      /* Left line */
      ctx.fillStyle = palette[state === EnumButtonState.DOWN ? 1 : 0];
      ctx.fillRect(x, y, 1, height);

      /* Right line */
      ctx.fillStyle = palette[state === EnumButtonState.DOWN ? 0 : 1];
      ctx.fillRect(x + width - 1, y + 1, 1, height - 1);

      /* Bottom line */
      ctx.fillStyle = palette[state === EnumButtonState.DOWN ? 0 : 1];
      ctx.fillRect(x, y + height - 1, width, 1);
    }

    /* Icon */
    icon(ctx, palette, buttonProps);
  };

  ctx && render();

  return <></>;
};

export default Button;
