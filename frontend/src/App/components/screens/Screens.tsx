import React, { FC } from "react";
import Screen from "./Screen";
import { useIntuitionStore } from "../../stores/useIntuitionStore";
import { TMessage } from "../../interfaces/message";

interface Props {
  sendMessage: (Message: TMessage) => void;
}

const Screens: FC<Props> = ({ sendMessage }) => {
  const { screens } = useIntuitionStore((state) => state);
  return (
    <>
      {screens.map((screen, index) => {
        return <Screen key={index} screen={screen} sendMessage={sendMessage} />;
      })}
    </>
  );
};

export default Screens;
