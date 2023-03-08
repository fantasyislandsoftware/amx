import React, { FC } from "react";
import { useWindowStore } from "../stores/windowStore";
import { EnumScreenState, EnumWindowState, TScreen, TWindow } from "../types";
import { Window } from "./Window/Window";
import { colours } from "../utilities/colours/wb";

interface ScreenProps {}

export const Screen: FC<ScreenProps & TScreen> = ({ props }) => {
  const windows = useWindowStore.getState().windows;

  const containerStyle = {
    display: "flex",
    flexFlow: "column",
    height: "100%",
  };

  const titleBarStyle = {
    backgroundColor: colours.grey,
    color: colours.black,
    padding: "2px",
  };

  const contentStyle = { backgroundColor: "#AAAAAA", flexGrow: 1 };

  return (
    <>
      {props.info.state === EnumScreenState.OPEN && (
        <div style={containerStyle}>
          <div className="titlebar" style={titleBarStyle}>
            {props.info.title}
          </div>
          <div style={{ width: "100%", height: "2px" }}></div>
          <section className="screen" style={contentStyle}>
            {windows.map((window, key) => {
              if (
                window.props.info.parentId === props.info.id &&
                window.props.info.state === EnumWindowState.OPEN
              )
                return <Window key={key} props={window.props} />;
            })}
          </section>
        </div>
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
