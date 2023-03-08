import { CSSProperties } from "react";
import { colours } from "../../utilities/colours/wb";

export const styleWindowContainer = (
  x: number,
  y: number,
  width: number,
  height: number
): CSSProperties => {
  return {
    left: `${x}px`,
    top: `${y}px`,
    width: `${width}px`,
    height: `${height}px`,
    background: colours.grey,
    color: "black",
    border: "1px solid #acacac",
    borderRadius: "6px",
    boxShadow: "0px 0px 20px #acacac",
    position: "absolute",
    display: "flex",
    flexDirection: "column",
  };
};

export const styleWindowTitleBar = (): CSSProperties => {
  return {
    color: "#4d494d",
    fontSize: "11pt",
    lineHeight: "20px",
    textAlign: "center",
    width: "100%",
    height: "20px",
    borderTop: "1px solid #f3f1f3",
    borderBottom: "1px solid #b1aeb1",
    borderTopLeftRadius: "6px",
    borderTopRightRadius: "6px",
    cursor: "move",
    userSelect: "none",
    background: "-webkit-linear-gradient(top, #ebebeb, #d5d5d5)",
  };
};

export const windowStyleContent = (): CSSProperties => {
  return { overflow: "scroll" };
};
