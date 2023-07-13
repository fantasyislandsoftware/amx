import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TScreen } from "../../interfaces/screen";
import Windows from "../windows/Windows";
import TitleBar from "./TitleBar";
import CrossHair from "../CrossHair";
import Canvas from "../Canvas";
import ClearScreen from "../ClearScreen";
import { dragElement } from "../../functions/drag";
import { useIntuitionStore } from "../../stores/useIntuitionStore";
import { useMouseStore } from "../../stores/useMouseStore";
import { EnumMouseButton } from "../../interfaces/input";
import { findWindow, windowIdToIndex } from "../../functions/windows";
import { calcScreenElements } from "../../functions/calcElements/calcScreenElements";
import { calcWindowElements } from "../../functions/calcElements/calcWindowElements";
import {
  EnumMessageAction,
  EnumMessageObj,
  TMessage,
} from "../../interfaces/message";
import { EnumButtonState } from "../../interfaces/button";
import { screenIdToIndex } from "../../functions/screen";

const ScreenContainer: any = styled.div`
  background: black;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: ${(props: any) => props.zindex};
  top: ${(props: any) => props.top}px;
`;

interface Props {
  screen: TScreen;
  processMessage: (Message: TMessage) => void;
}

const Screen: FC<Props> = ({ screen, processMessage }) => {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const baseId = `screen_${screen.id}_draggable`;
  const { screens, setScreens } = useIntuitionStore((state) => state);
  const { setSelectedScreen, selectedWindow, setSelectedWindow } =
    useIntuitionStore((state) => state);
  const { mouse, setMouse } = useMouseStore((state) => state);
  const [windowOffset, setWindowOffset] = useState({ x: 0, y: 0 });
  const [windowDrag, setWindowDrag] = useState(true);

  const screenProps = calcScreenElements(screen);
  const windowProps = calcWindowElements(screen);

  const selectedWindowId = findWindow(screen.windows, mouse.px, mouse.py);
  const selectedWindowIndex = windowIdToIndex(screen.windows, selectedWindowId);

  const inBoundary = (
    mx: number,
    my: number,
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    if (mx > x && mx < x + width && my > y && my < y + height) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    setCanvas(canvasRef.current);
    if (canvas) {
      setCtx(canvas.getContext("2d"));
      if (ctx) {
        dragElement(canvasRef.current, true, (top) => {
          if (mouse.py < screenProps.titleBar?.height) {
            const index = screenIdToIndex(screen.id);
            screens[index].y = screens[index].y + top;
            if (screens[index].y < 0) {
              screens[index].y = 0;
            }
          }
        });
      }
    }
  });

  const mouseDown = (e: any) => {
    /* Mouse */
    setMouse({
      px: mouse.px,
      py: mouse.py,
      cx: mouse.cx,
      cy: mouse.cy,
      leftButton: EnumMouseButton.DOWN,
    });

    /* Screen */
    setSelectedScreen(screen.id);

    /* Window */
    setSelectedWindow({ index: selectedWindowIndex, id: selectedWindowId });
    if (selectedWindowIndex !== null) {
      setWindowOffset({
        x: mouse.px - screen.windows[selectedWindowIndex].x,
        y: mouse.py - screen.windows[selectedWindowIndex].y,
      });

      /* Window Buttons */
      windowProps[selectedWindowIndex].titleBar.buttons.map((button, index) => {
        const { x, y, width, height } = button;
        if (inBoundary(mouse.px, mouse.py, x, y, width, height)) {
          screen.windows[selectedWindowIndex].titleBar.buttons[index].state =
            EnumButtonState.DOWN;
          setWindowDrag(false);
        }
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
    setWindowDrag(true);

    /* Release all buttons */
    screen.windows.map((window, index) => {
      let win = screen.windows[index];
      if (win !== null) {
        win.titleBar.buttons.map((button, index) => {
          button.state = EnumButtonState.UP;
        });
      }
    });

    /* Window Buttons */
    const props = windowProps[selectedWindowIndex];
    if (props) {
      props.titleBar.buttons.map((button, index) => {
        const { x, y, width, height } = button;
        if (inBoundary(mouse.px, mouse.py, x, y, width, height)) {
          processMessage({
            id: selectedWindowId,
            parentId: screen.id,
            obj: EnumMessageObj.WINDOW,
            action: button.action,
          });
        }
      });
    }
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
    if (selectedWindow !== null && windowDrag) {
      if (selectedWindow.index !== null) {
        if (
          windowOffset.y < windowProps[selectedWindow.index].titleBar.height &&
          mouse.leftButton === EnumMouseButton.DOWN
        ) {
          screen.windows[selectedWindow.index].x = mouse.px - windowOffset.x;
          screen.windows[selectedWindow.index].y = mouse.py - windowOffset.y;
        }
      }
    }
  };

  return (
    <ScreenContainer id={baseId} zindex={screen.order} top={screen.y}>
      <Canvas
        canvasRef={canvasRef}
        screen={screen}
        mouseDown={mouseDown}
        mouseUp={mouseUp}
        mouseMove={mouseMove}
      >
        <ClearScreen ctx={ctx} screen={screen} />
        <TitleBar
          ctx={ctx}
          screenProps={screenProps}
          palette={screen.palette}
        />
        <Windows ctx={ctx} palette={screen.palette} windowProps={windowProps} />
        <CrossHair ctx={ctx} screen={screen} enabled={false} />
      </Canvas>
    </ScreenContainer>
  );
};

export default Screen;
