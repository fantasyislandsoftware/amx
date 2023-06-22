import React, { useRef, useEffect, FC, useState } from "react";
import styled from "styled-components";
import { titleBar } from "./gadgets/screen/titleBar";
import { crossHair } from "./gadgets/misc/crossHair";
import { iwindow } from "./gadgets/window/iwindow";
import { TScreen } from "../interfaces/screen";
import { TWindow } from "../interfaces/window";

const ScreenContainer: any = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: ${(props: any) => props.zindex};
  top: ${(props: any) => props.top}px;
`;

interface Props {
  screen: TScreen;
  sendMessage: (message: any) => void;
}

enum EnumMouseButton {
  UP,
  DOWN,
}

type Mouse = { x: number; y: number; leftButton: EnumMouseButton };

const Screen: FC<Props> = ({ screen, sendMessage }) => {
  const [canvas, setCanvas] = useState(null);
  const [context, setContext] = useState(null);
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    leftButton: EnumMouseButton.UP,
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [selectedWindow, setSelectedWindow] = useState(null);

  const baseId = `screen_${screen.id}_draggable`;

  const canvasRef = useRef(null);

  const render = () => {
    context.clearRect(0, 0, screen.mode.width, screen.mode.height);
    titleBar(context, screen, sendMessage, baseId, mouse.y);
    const windows: TWindow[] = screen.windows.sort((a: TWindow, b: TWindow) => {
      if (a.zOrder < b.zOrder) {
        return -1;
      }
    });

    windows.map((window) => {
      iwindow(context, screen, window, selectedWindow);
    });

    crossHair(context, screen, mouse);
    window.requestAnimationFrame(render);
  };

  useEffect(() => {
    setCanvas(canvasRef.current);
    if (canvas) {
      setContext(canvas.getContext("2d"));
      if (context) {
        render();
      }
    }
  });

  const clickWindow = (screen: TScreen, mouse: Mouse): any => {
    let result = null;
    screen.windows.map((window) => {
      if (
        mouse.x > window.x &&
        mouse.x < window.x + window.width &&
        mouse.y > window.y &&
        mouse.y < window.y + window.height
      ) {
        result = window.id;
      }
    });
    return result;
  };

  const mouseDown = (e: any) => {
    const selectedWindow = clickWindow(screen, mouse);
    setSelectedWindow(selectedWindow);
    if (selectedWindow !== null) {
      setOffset({
        x: mouse.x - screen.windows[selectedWindow].x,
        y: mouse.y - screen.windows[selectedWindow].y,
      });
    }
    setMouse({ x: mouse.x, y: mouse.y, leftButton: EnumMouseButton.DOWN });
  };

  const mouseUp = (e: any) => {
    setMouse({ x: mouse.x, y: mouse.y, leftButton: EnumMouseButton.UP });
  };

  const mouseMove = (e: any) => {
    const elPos = {
      x: Math.round(e.clientX / (e.target.clientWidth / screen.mode.width)),
      y: Math.round(
        (e.clientY - e.target.parentElement.getAttribute("top")) /
          (e.target.clientHeight / screen.mode.height)
      ),
    };
    setMouse({ x: elPos.x, y: elPos.y, leftButton: mouse.leftButton });
    if (mouse.leftButton === EnumMouseButton.DOWN && selectedWindow !== null) {
      screen.windows[selectedWindow].x = elPos.x - offset.x;
      screen.windows[selectedWindow].y = elPos.y - offset.y;
    }
  };

  return (
    <ScreenContainer id={baseId} zindex={screen.order} top={screen.y}>
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
        onMouseLeave={mouseUp}
        onClick={() => {
          //sendMessage({ screenId: screen.id, key: "y", value: 0 });
        }}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      />
    </ScreenContainer>
  );
};

export default Screen;
