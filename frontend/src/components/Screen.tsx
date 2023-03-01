import React, { FC } from "react";
import { useWindowStore } from "../stores/windowStore";
import { EnumScreenState, EnumWindowState, TScreen, TWindow } from "../types";
import { Window } from "./Window";

interface ScreenProps {
}

export const Screen: FC<ScreenProps & TScreen> = ({ props }) => {
  const windows = useWindowStore.getState().windows;
  return (
    <>
      {props.info.state === EnumScreenState.OPEN && (
        <>
          <div className="titlebar">{props.info.title}</div>
          <section className="screen">
            {windows.map((window, key) => {
              if (
                window.props.info.parentId === props.info.id &&
                window.props.info.state === EnumWindowState.OPEN
              )
                return <Window key={key} props={window.props} />;
            })}
          </section>
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
