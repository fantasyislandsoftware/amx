import React, { FC, useState } from "react";
import { TScreen } from "../interfaces/screen";

interface Props {
  children: any;
  canvasRef: any;
  screen: TScreen;
  mouseDown: any;
  mouseUp: any;
  mouseMove: any;
}

const Canvas: FC<Props> = ({
  children,
  canvasRef,
  screen,
  mouseDown,
  mouseUp,
  mouseMove,
}) => {
  return (
    <canvas
      //width={screen.mode.width}
      //height={screen.mode.height}
      style={{
        imageRendering: "pixelated",
        fontSmooth: "never",
        WebkitFontSmoothing: "none",
        backgroundColor: "white",
        width: "100%",
        height: "70vw",
      }}
      ref={canvasRef}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      //onMouseLeave={mouseUp}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </canvas>
  );
};

export default Canvas;
