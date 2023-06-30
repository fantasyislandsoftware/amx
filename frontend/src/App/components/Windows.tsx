import React, { FC } from "react";
import { TWindow } from "../interfaces/window";
import Window from "./Window";
import { TScreen } from "../interfaces/screen";

interface Props {
  ctx: any;
  screen: TScreen;
  windows: TWindow[];
}

const Windows: FC<Props> = ({ ctx, screen, windows }) => {
  return (
    <>
      {windows.map((window, index) => {
        return <Window key={index} ctx={ctx} screen={screen} window={window} />;
      })}
    </>
  );
};

export default Windows;
