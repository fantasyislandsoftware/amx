import React, { FC } from "react";
import Screen from "./Screen";
import { TScreen } from "../interfaces/screen";

interface Props {
  screens: TScreen[];
  sendMessage: (Message: any) => void;
}

const Screens: FC<Props> = ({ screens, sendMessage }) => {
  return (
    <>
      {screens.map((screen, index) => {
        return <Screen key={index} screen={screen} sendMessage={sendMessage} />;
      })}
    </>
  );
};

export default Screens;
