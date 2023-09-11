import { type FC, useEffect, useRef, useState } from "react";
import { type IScreen } from "../screenInterface";
import ScreenDisplayBuffer from "./buffers/ScreenDisplayBuffer";
import ScreenTitleBarBuffer from "./buffers/ScreenTitleBarBuffer";
import { evt } from "../events";
import { EnumOSEventType, type IOSEvent } from "../../../interfaces/OSEvents";
import ScreenClientBuffer from "./buffers/ScreenClientBuffer";

interface IProps {
  screen: IScreen;
  processOSEvent: (osEvent: IOSEvent) => void;
}

const ScreenContainer: FC<IProps> = ({ screen, processOSEvent }) => {
  /* Display Canvas Context */
  const ref = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);

  /* Set display canvas context */
  useEffect(() => {
    if (ref.current) {
      setCtx(ref.current.getContext("2d"));
    }
    if (ctx) {
      if (screen.clientContext) {
        ctx.drawImage(screen.clientContext.canvas, 0, 0);
      }
      if (screen.titleBarContext) {
        ctx.drawImage(screen.titleBarContext.canvas, 0, 0);
      }
    }
  }, [ref, ctx]);

  return (
    <div
      style={{
        background: "#404040",
        position: "fixed",
        width: "100%",
        height: "100%",
        top: `${screen.top}px`,
        zIndex: `${screen.zIndex}`,
      }}
    >
      <ScreenDisplayBuffer
        _ref={ref}
        screen={screen}
        onMouseDown={(event) => {
          evt(event, processOSEvent, EnumOSEventType.MouseDown, screen);
        }}
        onMouseUp={(event) => {
          evt(event, processOSEvent, EnumOSEventType.MouseUp, screen);
        }}
        onMouseMove={(event) => {
          evt(event, processOSEvent, EnumOSEventType.MouseMove, screen);
        }}
        onMouseLeave={(event) => {
          evt(event, processOSEvent, EnumOSEventType.MouseLeave, screen);
        }}
      />
      {screen.titleBar && <ScreenTitleBarBuffer screen={screen} />}
      <ScreenClientBuffer screen={screen} />
    </div>
  );
};

export default ScreenContainer;
