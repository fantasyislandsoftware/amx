import React, { FC, useEffect, useRef, useState } from "react";
import { IScreen } from "../screenInterface";
import {
  EnumOSEventType,
  IMouse,
  IOSEvent,
} from "../../../interfaces/OSEvents";
import ScreenDisplayBuffer from "./buffers/ScreenDisplayBuffer";
import ScreenTitleBarBuffer from "./buffers/ScreenTitleBarBuffer";
import { evt } from "../events";

interface IProps {
  screen: IScreen;
  processOSEvent: (osEvent: IOSEvent) => void;
}

const ScreenContainer: FC<IProps> = ({ screen, processOSEvent }) => {
  /* Display Canvas Context */
  const displayCanvasRef = useRef<HTMLCanvasElement>(null);
  const [displayCanvasCtx, setDisplayCanvasCtx] =
    useState<CanvasRenderingContext2D>(null);
  const [titleBarHeight, setTitleBarHeight] = useState(0);

  /* Set display canvas context */
  useEffect(() => {
    if (displayCanvasRef.current) {
      setDisplayCanvasCtx(displayCanvasRef.current.getContext("2d"));
    }
  }, [displayCanvasRef]);

  return (
    <div
      style={{
        background: "blue",
        position: "fixed",
        width: "100%",
        height: "100%",
        top: `${screen.top}px`,
      }}
    >
      <ScreenDisplayBuffer
        _ref={displayCanvasRef}
        screen={screen}
        onMouseDown={(event) => {
          evt(
            event,
            processOSEvent,
            EnumOSEventType.MouseDown,
            screen,
            titleBarHeight
          );
        }}
        onMouseUp={(event) => {
          evt(
            event,
            processOSEvent,
            EnumOSEventType.MouseUp,
            screen,
            titleBarHeight
          );
        }}
        onMouseMove={(event) => {
          evt(
            event,
            processOSEvent,
            EnumOSEventType.MouseMove,
            screen,
            titleBarHeight
          );
        }}
        onMouseLeave={(event) => {
          evt(
            event,
            processOSEvent,
            EnumOSEventType.MouseLeave,
            screen,
            titleBarHeight
          );
        }}
      />
      {screen.titleBar && (
        <ScreenTitleBarBuffer
          dstCtx={displayCanvasCtx}
          screen={screen}
          titleBarHeight={titleBarHeight}
          setTitleBarHeight={setTitleBarHeight}
        />
      )}
    </div>
  );
};

export default ScreenContainer;
