import React, { FC } from "react";
import Screen from "./Screen";
import { useIntuitionStore } from "../../stores/useIntuitionStore";
import { TSettings } from "../../interfaces/settings";

interface Props {
  sendMessage: (Message: any) => void;
}

const Screens: FC<Props> = ({}) => {
  const { screens } = useIntuitionStore((state) => state);
  return (
    <>
      {screens.map((screen, index) => {
        return <Screen key={index} screen={screen} />;
      })}
    </>
  );
};

export default Screens;
