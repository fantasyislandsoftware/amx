import React, { FC } from "react";
import { EnumScreenState, TScreen } from "../types";

interface ScreenProps {}

export const Screen: FC<ScreenProps & TScreen> = ({ props }) => {
  return (
    <>
      {props.info.state === EnumScreenState.OPEN && (
        <>
          <div className="titlebar">{props.info.title}</div>
          <section className="screen"></section>
        </>
      )}
    </>
  );
};

export default Screen;

/*
return (
    <>
      <div className="titlebar">{info.title}</div>
      <section className="screen">
        {windows.map((window, key) => (
          <Window key={key} title={window.title} />
        ))}
      </section>
    </>
  );
*/
