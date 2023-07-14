import React, { FC } from "react";
import Window from "./Window";
import { TContext } from "../../interfaces/canvas";
import { TCalcWindowElement } from "../../functions/calcElements/calcWindowElements";

interface Props {
  ctx: TContext;
  palette: string[];
  windowProps: TCalcWindowElement[];
}

const Windows: FC<Props> = ({ ctx, palette, windowProps }) => {
  return (
    <>
      {windowProps.map((windowProp, index) => {
        if (windowProp !== undefined) {
          return (
            <Window
              key={index}
              ctx={ctx}
              palette={palette}
              windowProps={windowProp}
            />
          );
        }
      })}
    </>
  );
};

export default Windows;

/*
<>
      {windowProps.map((windowProp, index) => {
        if (windowProp !== undefined) {
          return (
            <Window
              key={index}
              ctx={ctx}
              palette={palette}
              windowProps={windowProp}
            />
          );
        }
      })}
    </>
*/
