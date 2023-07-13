import React, { FC } from "react";
import Screen from "./Screen";
import { useIntuitionStore } from "../../stores/useIntuitionStore";
import { TMessage } from "../../interfaces/message";

interface Props {
  processMessage: (Message: TMessage) => void;
}

const Screens: FC<Props> = ({ processMessage }) => {
  const { screens } = useIntuitionStore((state) => state);
  return (
    <>
      {screens.map((screen, index) => {
        return (
          <Screen key={index} screen={screen} processMessage={processMessage} />
        );
      })}
    </>
  );
};

export default Screens;
