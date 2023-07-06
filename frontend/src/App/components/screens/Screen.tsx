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
import { TCalcElements, TCalcWindow } from "../../interfaces/elements";
import { calcScreenElements } from "../../functions/calcElements/calcScreenElements";
import { calcWindowElements } from "../../functions/calcElements/calcWindowElements";
import { TSettings } from "../../interfaces/settings";

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
}

const Screen: FC<Props> = ({ screen }) => {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const baseId = `screen_${screen.id}_draggable`;
  const { screens, setScreens } = useIntuitionStore((state) => state);
  const { setSelectedScreen, selectedWindow, setSelectedWindow } =
    useIntuitionStore((state) => state);
  const { mouse, setMouse } = useMouseStore((state) => state);
  const [windowOffset, setWindowOffset] = useState({ x: 0, y: 0 });

  const screenProps = calcScreenElements(screen);
  const windowProps = calcWindowElements(screen);

  const convertScreenIdToIndex = (screenId: number) => {
    return screens.findIndex((screen) => screen.id === screenId);
  };

  useEffect(() => {
    setCanvas(canvasRef.current);
    if (canvas) {
      setCtx(canvas.getContext("2d"));
      if (ctx) {
        dragElement(canvasRef.current, true, (top) => {
          if (mouse.py < screenProps.titleBar?.height) {
            const index = convertScreenIdToIndex(screen.id);
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
    const _selectedWindow = windowIdToIndex(
      screen.windows,
      findWindow(screen.windows, mouse.px, mouse.py)
    );

    /* Window */
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
      windowOffset.y < windowProps[selectedWindow].titleBar.height &&
      mouse.leftButton === EnumMouseButton.DOWN
    ) {
      screen.windows[selectedWindow].x = mouse.px - windowOffset.x;
      screen.windows[selectedWindow].y = mouse.py - windowOffset.y;
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
