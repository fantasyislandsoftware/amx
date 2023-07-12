import React, { FC } from "react";
import { TContext } from "../../interfaces/canvas";
import { TCalcButtonElement } from "../../functions/calcElements/calcWindowElements";
import Button from "./Button";

interface Props {
  ctx: TContext;
  isSelected: boolean;
  palette: string[];
  buttonProps: TCalcButtonElement[];
}

const Buttons: FC<Props> = ({ ctx, isSelected, palette, buttonProps }) => {
  return (
    <>
      {buttonProps.map((buttonProp, index) => {
        if (buttonProp !== undefined) {
          return (
            <Button
              key={index}
              ctx={ctx}
              palette={palette}
              buttonProps={buttonProp}
              hasBorder={true}
              isSelected={isSelected}
              icon={buttonProp.icon}
            />
          );
        }
      })}
    </>
  );
};

export default Buttons;
