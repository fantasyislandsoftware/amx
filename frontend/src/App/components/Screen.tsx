import React, { FC, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TScreen } from "../interfaces/screen";
import Windows from "./Windows";
import TitleBar from "./TitleBar";
import CrossHair from "./CrossHair";
import Canvas from "./Canvas";
import ClearScreen from "./ClearScreen";
import { dragElement } from "../functions/drag";
import { useIntuitionStore } from "../stores/useIntuitionStore";
import { useMouseStore } from "../stores/useMouseStore";
import MouseCursor from "./MouseCursor";

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
  const { mouse } = useMouseStore((state) => state);

  const convertScreenIdToIndex = (screenId: number) => {
    return screens.findIndex((screen) => screen.id === screenId);
  };

  useEffect(() => {
    setCanvas(canvasRef.current);
    if (canvas) {
      setCtx(canvas.getContext("2d"));
      if (ctx) {
        dragElement(canvasRef.current, true, (top) => {
          if (
            mouse.py <
            screen.titleBar.fontSize + screen.titleBar.padding * 2
          ) {
            const index = convertScreenIdToIndex(screen.id);
            screens[index].y = screens[index].y + top;
          }
        });
      }
    }
  });

  return (
    <ScreenContainer id={baseId} zindex={screen.order} top={screen.y}>
      <Canvas canvasRef={canvasRef} screen={screen}>
        <ClearScreen ctx={ctx} screen={screen} />
        <TitleBar ctx={ctx} screen={screen} />
        <Windows ctx={ctx} screen={screen} windows={screen.windows} />
        <CrossHair ctx={ctx} screen={screen} enabled={true} />
      </Canvas>
    </ScreenContainer>
  );
};

export default Screen;
