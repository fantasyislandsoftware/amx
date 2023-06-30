import React, { FC, useState } from "react";
import { TScreen } from "../interfaces/screen";
import { EnumMouseButton } from "../interfaces/input";
import { useMouseStore } from "../stores/useMouseStore";
import { useIntuitionStore } from "../stores/useIntuitionStore";
import { findWindow, windowIdToIndex } from "../functions/windows";

interface Props {
  children: any;
  canvasRef: any;
  screen: TScreen;
}

const Canvas: FC<Props> = ({ children, canvasRef, screen }) => {
  const { mouse, setMouse } = useMouseStore((state) => state);
  const { setSelectedScreen, selectedWindow, setSelectedWindow } =
    useIntuitionStore((state) => state);
  const [windowOffset, setWindowOffset] = useState({ x: 0, y: 0 });

  const mouseDown = (e: any) => {
    setMouse({
      px: mouse.px,
      py: mouse.py,
      cx: mouse.cx,
      cy: mouse.cy,
      leftButton: EnumMouseButton.DOWN,
    });
    setSelectedScreen(screen.id);
    const _selectedWindow = windowIdToIndex(
      screen.windows,
      findWindow(screen.windows, mouse.px, mouse.py)
    );
    setSelectedWindow(_selectedWindow);
    if (_selectedWindow !== null) {
      setWindowOffset({
        x: mouse.px - screen.windows[_selectedWindow].x,
        y: mouse.py - screen.windows[_selectedWindow].y,
      });
    }
  };

  const mouseUp = (e: any) => {
    setMouse({
      px: mouse.px,
      py: mouse.py,
      cx: mouse.cx,
      cy: mouse.cy,
      leftButton: EnumMouseButton.UP,
    });
  };

  const mouseMove = (e: any) => {
    setMouse({
      px: Math.round(e.clientX / (e.target.clientWidth / screen.mode.width)),
      py: Math.round(
        (e.clientY - e.target.parentElement.getAttribute("top")) /
          (e.target.clientHeight / screen.mode.height)
      ),
      cx: e.clientX,
      cy: e.clientY,
      leftButton: mouse.leftButton,
    });
    if (
      selectedWindow !== null &&
      windowOffset.y < screen.windows[selectedWindow].titleBar.fontSize &&
      mouse.leftButton === EnumMouseButton.DOWN
    ) {
      screen.windows[selectedWindow].x = mouse.px - windowOffset.x;
      screen.windows[selectedWindow].y = mouse.py - windowOffset.y;
    }
  };

  return (
    <canvas
      width={screen.mode.width}
      height={screen.mode.height}
      style={{
        imageRendering: "pixelated",
        fontSmooth: "never",
        WebkitFontSmoothing: "none",
        backgroundColor: "white",
        width: "100%",
        height: "65vw",
      }}
      ref={canvasRef}
      onMouseDown={mouseDown}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      //onMouseLeave={mouseUp}
      onContextMenu={(e) => {
        //e.preventDefault();
      }}
    >
      {children}
    </canvas>
  );
};

export default Canvas;
